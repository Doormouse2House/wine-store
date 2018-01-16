import { browser, by, element } from 'protractor';

describe('Description', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should be displayed on the home page', async () => {
    const present = await element(by.css('sd-description div.description')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a "Description" header', async () => {
    const text = await element(by.css('sd-description div div.heading h1')).getText();
    expect(text).toEqual('Description');
  });

  it('should have a para for the description', async () => {
    const present = await element(by.css('div.description-content > p')).isPresent();
    expect(present).toEqual(true);
  });


});
