import { browser, by, element } from 'protractor';

describe('ProducerName', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should be displayed on the home page', async () => {
    const present = await element(by.css('sd-contacts div.contacts')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a "Contacts" header', async () => {
    const text = await element(by.css('sd-contacts div div.heading h1')).getText();
    expect(text).toEqual('Contacts');
  });

  it('should have a "Contact" within the Contacts div', async () => {
    const present = await element(by.css('sd-contacts div.contacts div.contact')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a span for the name', async () => {
    const present = await element(by.css('span.name-content')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a position span', async () => {
    const present = await element(by.css('span.position-content')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a web address', async () => {
    const text = await element(by.css('a.email-content')).getText();
    const reg = '[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
    expect(text).toMatch(reg);
  });

  it('should have a phone span', async () => {
    const present = await element(by.css('span.phone-content')).isPresent();
    expect(present).toEqual(true);
  });

});
