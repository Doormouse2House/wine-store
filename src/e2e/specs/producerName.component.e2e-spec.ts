import { browser, by, element } from 'protractor';

describe('ProducerName', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should be displayed on the home page', async () => {
    const present = await element(by.css('sd-producer-name div.producerName')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a "Producer" header', async () => {
    const text = await element(by.css('sd-producer-name div div.heading h1')).getText();
    expect(text).toEqual('Producer');
  });

  it('should have a header for the name', async () => {
    const present = await element(by.css('sd-producer-name div.producerName div.name h2')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have an address', async () => {
    const present = await element(by.css('sd-producer-name div div.address p')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a web address', async () => {
    const text = await element(by.css('sd-producer-name div div.producerWeb a')).getText();
    const reg = '[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)';
    expect(text).toMatch(reg);
  });

});
