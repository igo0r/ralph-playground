import { Page, Locator } from '@playwright/test';

/**
 * Page Object Model for Wikipedia home page (https://www.wikipedia.org)
 * Encapsulates locators and actions for interacting with the Wikipedia portal page
 */
export class WikipediaHomePage {
  readonly page: Page;

  // Locators
  readonly logo: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly languageLinks: Locator;
  readonly englishLink: Locator;
  readonly spanishLink: Locator;
  readonly frenchLink: Locator;
  readonly germanLink: Locator;
  readonly italianLink: Locator;
  readonly portugueseLink: Locator;
  readonly russianLink: Locator;
  readonly japaneseLink: Locator;
  readonly chineseLink: Locator;
  readonly arabicLink: Locator;

  /**
   * Initializes the WikipediaHomePage with a Playwright Page object
   * @param page - The Playwright Page instance
   */
  constructor(page: Page) {
    this.page = page;

    // Initialize locators using modern Playwright selectors
    this.logo = page.locator('.central-featured-logo');
    this.searchInput = page.locator('input[type="search"]');
    this.searchButton = page.locator('button[type="submit"]');

    // Language links - target the major languages
    this.languageLinks = page.locator('.central-featured a');
    this.englishLink = page.locator('#js-link-box-en');
    this.spanishLink = page.locator('#js-link-box-es');
    this.frenchLink = page.locator('#js-link-box-fr');
    this.germanLink = page.locator('#js-link-box-de');
    this.italianLink = page.locator('#js-link-box-it');
    this.portugueseLink = page.locator('#js-link-box-pt');
    this.russianLink = page.locator('#js-link-box-ru');
    this.japaneseLink = page.locator('#js-link-box-ja');
    this.chineseLink = page.locator('#js-link-box-zh');
    this.arabicLink = page.locator('#js-link-box-ar');
  }

  /**
   * Navigates to the Wikipedia home page
   */
  async goto(): Promise<void> {
    await this.page.goto('https://www.wikipedia.org');
  }

  /**
   * Verifies that the page has loaded successfully by checking for key elements
   * @returns Promise<boolean> - True if page loaded successfully
   */
  async verifyPageLoad(): Promise<boolean> {
    try {
      await this.logo.waitFor({ state: 'visible', timeout: 5000 });
      await this.searchInput.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Performs a search by entering text and submitting
   * @param searchTerm - The text to search for
   */
  async search(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchInput.press('Enter');
  }

  /**
   * Performs a search using the search button instead of Enter key
   * @param searchTerm - The text to search for
   */
  async searchWithButton(searchTerm: string): Promise<void> {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  /**
   * Selects a language edition by language code
   * @param languageCode - The ISO language code (e.g., 'en', 'es', 'fr')
   */
  async selectLanguage(languageCode: string): Promise<void> {
    const languageMap: { [key: string]: Locator } = {
      'en': this.englishLink,
      'es': this.spanishLink,
      'fr': this.frenchLink,
      'de': this.germanLink,
      'it': this.italianLink,
      'pt': this.portugueseLink,
      'ru': this.russianLink,
      'ja': this.japaneseLink,
      'zh': this.chineseLink,
      'ar': this.arabicLink,
    };

    const languageLink = languageMap[languageCode.toLowerCase()];
    if (!languageLink) {
      throw new Error(`Language code '${languageCode}' not supported. Supported codes: ${Object.keys(languageMap).join(', ')}`);
    }

    await languageLink.click();
  }

  /**
   * Checks if the Wikipedia logo is visible
   * @returns Promise<boolean> - True if logo is visible
   */
  async isLogoVisible(): Promise<boolean> {
    try {
      await this.logo.waitFor({ state: 'visible', timeout: 3000 });
      return await this.logo.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Checks if the search box is visible
   * @returns Promise<boolean> - True if search box is visible
   */
  async isSearchBoxVisible(): Promise<boolean> {
    try {
      await this.searchInput.waitFor({ state: 'visible', timeout: 3000 });
      return await this.searchInput.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Checks if the search box is enabled and ready for input
   * @returns Promise<boolean> - True if search box is enabled
   */
  async isSearchBoxEnabled(): Promise<boolean> {
    return await this.searchInput.isEnabled();
  }

  /**
   * Gets the count of visible language links on the page
   * @returns Promise<number> - The number of visible language links
   */
  async getLanguageLinksCount(): Promise<number> {
    return await this.languageLinks.count();
  }

  /**
   * Checks if a specific language link is visible
   * @param languageCode - The ISO language code (e.g., 'en', 'es', 'fr')
   * @returns Promise<boolean> - True if the language link is visible
   */
  async isLanguageLinkVisible(languageCode: string): Promise<boolean> {
    const languageMap: { [key: string]: Locator } = {
      'en': this.englishLink,
      'es': this.spanishLink,
      'fr': this.frenchLink,
      'de': this.germanLink,
      'it': this.italianLink,
      'pt': this.portugueseLink,
      'ru': this.russianLink,
      'ja': this.japaneseLink,
      'zh': this.chineseLink,
      'ar': this.arabicLink,
    };

    const languageLink = languageMap[languageCode.toLowerCase()];
    if (!languageLink) {
      return false;
    }

    try {
      return await languageLink.isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Gets the page title
   * @returns Promise<string> - The page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Gets the current URL
   * @returns string - The current page URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
}
