import { test, expect } from '@playwright/test';
import { WikipediaHomePage } from '../pages/WikipediaHomePage';

test.describe('Wikipedia Search Functionality', () => {
  test('should successfully search for an article from the home page', async ({ page }) => {
    // Arrange: Initialize Page Object and navigate to Wikipedia home page
    const homePage = new WikipediaHomePage(page);
    await homePage.goto();

    // Verify the page loaded successfully by checking search box is available
    await expect(homePage.searchInput).toBeVisible();

    // Act: Perform search for 'Playwright'
    await homePage.search('Playwright');

    // Assert: Verify navigation occurred and search term appears
    // Wait for navigation to complete
    await page.waitForLoadState('domcontentloaded');

    // Verify we navigated away from the home page
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).not.toBe('https://www.wikipedia.org/');

    // Verify the search term 'Playwright' appears somewhere on the page
    // This could be in the article title, content, or search results
    const pageContent = await page.textContent('body');
    expect(pageContent).toContain('Playwright');

    // Additional verification: Check if we're on either a search results page or article page
    const isSearchResults = currentUrl.includes('search') || currentUrl.includes('Special:Search');
    const isArticlePage = currentUrl.includes('/wiki/');
    expect(isSearchResults || isArticlePage).toBe(true);
  });
});
