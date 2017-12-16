import { browser, by, element } from 'protractor';

describe('ProducerName', () => {

  beforeEach(async () => {
    return await browser.get('/');
  });

  it('should be displayed on the home page', async () => {
    const present = await element(by.css('sd-details div.details')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a "Details" header', async () => {
    const text = await element(by.css('sd-details div div.heading h1')).getText();
    expect(text).toEqual('Details');
  });

  it('should have a span for the owner', async () => {
    const present = await element(by.css('span.owner-content')).isPresent();
    expect(present).toEqual(true);
  });


  it('should have a span for the enologist', async () => {
    const present = await element(by.css('span.enologist-content')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a agricultural-lead span', async () => {
    const present = await element(by.css('span.agricultural-lead-content')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a planted-hectares span', async () => {
    const present = await element(by.css('span.planted-hectares-amount')).isPresent();
    expect(present).toEqual(true);
  });

  it('should have a product span', async () => {
    const present = await element(by.css('span.production-amount')).isPresent();
    expect(present).toEqual(true);
  });

});
