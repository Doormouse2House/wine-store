import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should have a title', async () => {
    const title = await browser.getTitle();
    expect(title).toEqual('Lilac Wine Database');
  });

  it('should have <nav>', async () => {
    const present = await element(by.css('sd-app sd-navbar nav')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have correct nav text for Home', async () => {
    const text = await element(by.css('sd-app sd-navbar nav a:first-child')).getText();
    expect(text).toEqual('Details');
  });

});
