from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating...")
            page.goto("http://localhost:5173", timeout=30000)
            
            print("Waiting for title...")
            page.wait_for_selector(".title")
            
            print("Waiting for canvas...")
            page.wait_for_selector("canvas")
            
            print("Taking screenshot...")
            page.screenshot(path="verification/verification.png")
            print("Screenshot saved.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app()
