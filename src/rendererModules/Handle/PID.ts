import {PIDRecord} from './PIDRecord';
import {PIDDataType} from './PIDDataType';
import {handleMap, unresolvables} from "../../utils/utils";
import {init} from "../../utils/DataCache";


/**
 * This class represents the PID itself.
 */
export class PID {
  /**
   * The prefix of the PID.
   * @type {string}
   * @private
   */
  private readonly _prefix: string;

  /**
   * The suffix of the PID.
   * @type {string}
   * @private
   */
  private readonly _suffix: string;

  /**
   * Creates a new PID object.
   * @param prefix The prefix of the PID.
   * @param suffix The suffix of the PID.
   * @constructor
   */
  constructor(prefix: string, suffix: string) {
    this._prefix = prefix;
    this._suffix = suffix;
  }

  /**
   * Outputs the prefix of the PID.
   * @returns {string} The prefix of the PID.
   */
  get prefix(): string {
    return this._prefix;
  }

  /**
   * Outputs the suffix of the PID.
   * @returns {string} The suffix of the PID.
   */
  get suffix(): string {
    return this._suffix;
  }

  /**
   * Outputs the PID as a string.
   * @returns {string} as "prefix/suffix"
   */
  toString(): string {
    return `${this.prefix}/${this.suffix}`;
  }

  /**
   * Checks if a string has the format of a PID.
   * @param text The string to check.
   * @returns {boolean} True if the string could be a PID, false if not.
   */
  public static isPID(text: string): boolean {
    return new RegExp('^([0-9A-Za-z])+\.([0-9A-Za-z])+/([!-~])+$').test(text);
  }

  /**
   * Checks if this PID is resolvable, by checking if it is in the unresolvables set or on the "forbidden" list.
   * @returns {boolean} True if the PID is resolvable, false if not.
   */
  isResolvable(): boolean {
    return !unresolvables.has(this) && !this.prefix.toUpperCase().match('^(0$|0\\.|HS_|10320$)');
  }

  /**
   * Creates a PID from a string.
   * @param pid The string to create the PID from.
   * @throws Error if the string is not a PID.
   * @returns {PID} The PID which was created.
   */
  public static getPIDFromString(pid: string): PID {
    if (!PID.isPID(pid)) throw new Error('Invalid input');
    const pidSplit = pid.split('/');
    return new PID(pidSplit[0], pidSplit[1]);
  }

  /**
   * Resolves the PID to a PIDRecord and saves it in the handleMap.
   * @returns {Promise<PIDRecord | undefined>} The PIDRecord of the PID.
   * If the PID is resolvable and nothing went wrong, the PIDRecord is returned.
   * Otherwise, undefined is returned.
   */
  public async resolve(): Promise<PIDRecord | undefined> {
    if (unresolvables.has(this)) return undefined;
    else if (handleMap.has(this)) return handleMap.get(this);
    else {
      const dataCache = await init('pid-component');
      const rawJson = await dataCache.fetch(`https://hdl.handle.net/api/handles/${this.prefix}/${this.suffix}#resolve`);
      const values = [];
      for (let value of rawJson.values) {
        let type = PID.isPID(value.type) ? PID.getPIDFromString(value.type) : value.type;
        if (type instanceof PID) {
          const dataType = await PIDDataType.resolveDataType(type);
          if (dataType instanceof PIDDataType) type = dataType;
        }
        values.push({
          index: value.index,
          type: type,
          data: value.data,
          ttl: value.ttl,
          timestamp: Date.parse(value.timestamp),
        });
      }
      const record = new PIDRecord(this, values);
      handleMap.set(this, record);
      return record;
    }
  }

  toObject() {
    return {
      prefix: this.prefix,
      suffix: this.suffix
    }
  }

  static fromJSON(serialized: string): PID {
    const data: ReturnType<PID["toObject"]> = JSON.parse(serialized);
    return new PID(data.prefix, data.suffix);
  }
}

/**
 * The PID of the location data type which points to a field where the locations of the data types in the data type registries are stored.
 * @type {PID}
 */
export const locationType: PID = new PID('10320', 'loc');
