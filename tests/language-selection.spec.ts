import { test, expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/WikipediaHomePage';

test.describe('Wikipedia Language Selection', () => {
  test('should successfully navigate to English Wikipedia from home page', async ({ page }) => {
    // Arrange: Initialize Page Object and navigate to Wikipedia home page
    const homePage = new WikipediaHomePage(page);
    await homePage.goto();

    // Verify the page loaded successfully by checking search box is available
    await expect(homePage.searchInput).toBeVisible();

    // Act: Click on English language link
    await homePage.selectLanguage('en');

    // Assert: Verify navigation to English Wikipedia domain
    // Wait for navigation to complete
    await page.waitForLoadState('domcontentloaded');

    // Verify we navigated to the English Wikipedia domain
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('en.wikipedia.org');

    // Verify page loaded successfully by checking for expected elements
    // English Wikipedia should have the search input visible
    const searchInput = page.locator('#searchInput');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Verify the page title contains Wikipedia
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toContain('Wikipedia');
  });

  test('should successfully navigate to Spanish Wikipedia from home page', async ({ page }) => {
    // Arrange: Initialize Page Object and navigate to Wikipedia home page
    const homePage = new WikipediaHomePage(page);
    await homePage.goto();

    // Verify the page loaded successfully by checking search box is available
    await expect(homePage.searchInput).toBeVisible();

    // Act: Click on Spanish language link
    await homePage.selectLanguage('es');

    // Assert: Verify navigation to Spanish Wikipedia domain
    // Wait for navigation to complete
    await page.waitForLoadState('domcontentloaded');

    // Verify we navigated to the Spanish Wikipedia domain
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('es.wikipedia.org');

    // Verify page loaded successfully by checking for expected elements
    // Spanish Wikipedia should have the search input visible
    const searchInput = page.locator('#searchInput');
    await expect(searchInput).toBeVisible({ timeout: 10000 });

    // Verify the page title contains Wikipedia
    const pageTitle = await homePage.getPageTitle();
    expect(pageTitle).toContain('Wikipedia');
  });
});
