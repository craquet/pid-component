import { describe, expect, it } from 'vitest';
import { beautifyResourceType } from '../ResourceTypeIcons';

describe('beautifyResourceType', () => {
  it('returns emoji and name for article', () => {
    expect(beautifyResourceType('article')).toBe('📰 Article');
  });

  it('returns emoji and name for book', () => {
    expect(beautifyResourceType('book')).toBe('📚 Book');
  });

  it('returns emoji and name for chapter', () => {
    expect(beautifyResourceType('chapter')).toBe('📖 Chapter');
  });

  it('returns emoji and name for software', () => {
    expect(beautifyResourceType('software')).toBe('💻 Software');
  });

  it('returns emoji and name for dataset', () => {
    expect(beautifyResourceType('dataset')).toBe('📊 Dataset');
  });

  it('returns emoji and name for image', () => {
    expect(beautifyResourceType('image')).toBe('🖼️ Image');
  });

  it('returns emoji and name for video', () => {
    expect(beautifyResourceType('video')).toBe('🎥 Video');
  });

  it('returns emoji and name for audio', () => {
    expect(beautifyResourceType('audio')).toBe('🎵 Audio');
  });

  it('returns emoji and name for presentation', () => {
    expect(beautifyResourceType('presentation')).toBe('🧑‍🏫 Presentation');
  });

  it('returns emoji and name for preprint', () => {
    expect(beautifyResourceType('preprint')).toBe('📝 Preprint');
  });

  it('returns emoji and name for thesis', () => {
    expect(beautifyResourceType('thesis')).toBe('🎓 Thesis');
  });

  it('returns emoji and name for report', () => {
    expect(beautifyResourceType('report')).toBe('📋 Report');
  });

  it('returns emoji and name for standard', () => {
    expect(beautifyResourceType('standard')).toBe('📜 Standard');
  });

  it('returns emoji and name for workflow', () => {
    expect(beautifyResourceType('workflow')).toBe('🔄 Workflow');
  });

  it('returns emoji and name for model', () => {
    expect(beautifyResourceType('model')).toBe('🧮 Model');
  });

  it('returns emoji and name for paper', () => {
    expect(beautifyResourceType('paper')).toBe('📄 Paper');
  });

  it('returns emoji and name for journal', () => {
    expect(beautifyResourceType('journal')).toBe('📰 Journal');
  });

  it('returns emoji and name for code', () => {
    expect(beautifyResourceType('code')).toBe('💻 Code');
  });

  it('returns emoji and name for institution', () => {
    expect(beautifyResourceType('institution')).toBe('🏛️ Institution');
  });

  it('returns emoji and name for conferencepaper', () => {
    expect(beautifyResourceType('conferencepaper')).toBe('🎤 Conference Paper');
  });

  it('returns emoji and name for database', () => {
    expect(beautifyResourceType('database')).toBe('🗄️ Database');
  });

  it('returns emoji and name for other', () => {
    expect(beautifyResourceType('other')).toBe('❓ Other');
  });

  it('handles hyphenated types by removing hyphen', () => {
    expect(beautifyResourceType('journal-article')).toBe('📄 Journal Article');
  });

  it('handles underscore types by removing underscore', () => {
    expect(beautifyResourceType('journal_article')).toBe('📄 Journal Article');
  });

  it('returns emoji and name for journalarticle', () => {
    expect(beautifyResourceType('journalarticle')).toBe('📄 Journal Article');
  });

  it('returns emoji and name for proceedingsarticle', () => {
    expect(beautifyResourceType('proceedingsarticle')).toBe('🎤 Proceedings Article');
  });

  it('returns emoji and name for reportseries', () => {
    expect(beautifyResourceType('reportseries')).toBe('📋 Report Series');
  });

  it('returns emoji and name for bookchapter', () => {
    expect(beautifyResourceType('bookchapter')).toBe('📖 Book Chapter');
  });

  it('returns emoji and name for monograph', () => {
    expect(beautifyResourceType('monograph')).toBe('📚 Monograph');
  });

  it('returns emoji and name for editedbook', () => {
    expect(beautifyResourceType('editedbook')).toBe('📚 Edited Book');
  });

  it('returns emoji and name for reportpaper', () => {
    expect(beautifyResourceType('reportpaper')).toBe('📋 Report Paper');
  });

  it('returns original string for unknown type', () => {
    expect(beautifyResourceType('unknown-type')).toBe('unknown-type');
  });

  it('returns original string for completely unknown type', () => {
    expect(beautifyResourceType('xyz123')).toBe('xyz123');
  });

  it('normalizes to lowercase before lookup', () => {
    expect(beautifyResourceType('ARTICLE')).toBe('📰 Article');
  });

  it('normalizes mixed case input', () => {
    expect(beautifyResourceType('Journal-Article')).toBe('📄 Journal Article');
  });
});