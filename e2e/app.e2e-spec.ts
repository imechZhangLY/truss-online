import { TrussOnlinePage } from './app.po';

describe('truss-online App', function() {
  let page: TrussOnlinePage;

  beforeEach(() => {
    page = new TrussOnlinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
