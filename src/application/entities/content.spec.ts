import { Content } from './content';

describe('Notification Content', () => {
  it('should be able create a notification content', () => {
    const content = new Content('Você recebeu uma nova mensagem');

    expect(content).toBeTruthy();
  });

  it('should not be able create a notification content with less than 5 characters', () => {
    expect(() => new Content('V')).toThrow();
  });

  it('should not be able create a notification content with more than 5 characters', () => {
    expect(() => new Content('V'.repeat(251))).toThrow();
  });
});
