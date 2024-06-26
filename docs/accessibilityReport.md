# GraphQL Schema Documentation

## Types

### `Status`
- `success`: Boolean - Indicates whether the request was successful.
- `httpstatuscode`: Int - The HTTP status code of the response.

### `Statistics`
- `pagetitle`: String - Title of the page being analyzed.
- `pageurl`: String - URL of the page being analyzed.
- `time`: Float - Time taken for the analysis.
- `creditsremaining`: Int - Remaining credits for API usage.
- `allitemcount`: Int - Total count of all items analyzed.
- `totalelements`: Int - Total number of elements on the page.
- `waveurl`: String - URL of the detailed report from WebAIM.

### `AccessibilityScore`
- `score`: Int - The accessibility score of the website.
- `totalElements`: Int - Total number of elements analyzed for scoring.

### `Report`
- `status`: Status - Status of the report.
- `statistics`: Statistics - Statistics of the analyzed page.
- `categories`: JSON - Detailed categorization of the accessibility issues.
- `accessibilityScore`: AccessibilityScore - Accessibility scoring details.

## Query

### `getAccessibilityReport`
Fetches an accessibility report for a given URL.

- Parameters:
  - `url`: String! (required) - The URL to be analyzed.
  - `reportType`: Int! (required) - The type of report to be generated.

## Example Queries

### Fetching an Accessibility Report

```graphql
query GetAccessibilityReport {
  getAccessibilityReport(url: "https://example.com", reportType: 4) {
    status {
      success
      httpstatuscode
    }
    statistics {
      pagetitle
      pageurl
      time
      creditsremaining
      allitemcount
      totalelements
      waveurl
    }
    categories
    accessibilityScore {
      score
      totalElements
    }
  }
}
```

## Example Response:

```json
{
            "status": {
                "success": true,
                "httpstatuscode": 200
            },
            "statistics": {
                "pagetitle": "Dev Genius",
                "pageurl": "https://blog.devgenius.io",
                "time": 3.81,
                "creditsremaining": 38,
                "allitemcount": 70,
                "totalelements": 434,
                "waveurl": "http://wave.webaim.org/report?url=https://blog.devgenius.io"
            },
            "categories": {
                "error": {
                    "description": "Errors",
                    "count": 3,
                    "items": {
                        "alt_missing": {
                            "id": "alt_missing",
                            "description": "Missing alternative text",
                            "count": 1,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child > DIV:first-child > DIV:first-child + IMG"
                            ]
                        },
                        "label_empty": {
                            "id": "label_empty",
                            "description": "Empty form label",
                            "count": 1,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child + DIV > LABEL:first-child"
                            ]
                        },
                        "language_missing": {
                            "id": "language_missing",
                            "description": "Language missing or invalid",
                            "count": 1,
                            "selectors": [
                                false
                            ]
                        }
                    }
                },
                "contrast": {
                    "description": "Contrast Errors",
                    "count": 12,
                    "items": {
                        "contrast": {
                            "id": "contrast",
                            "description": "Very low contrast",
                            "count": 12,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child > DIV:first-child + DIV > DIV:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child > DIV:first-child + DIV > DIV:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child + A",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER > DIV:first-child > DIV:first-child > DIV:first-child + DIV > A:first-child + H2",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child > LI:first-child > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child > LI:first-child + LI > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child > LI:first-child + LI + LI > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child > LI:first-child + LI + LI + LI > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child > LI:first-child + LI + LI + LI + LI > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child > LI:first-child + LI + LI + LI + LI + LI > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child > LI:first-child + LI + LI + LI + LI + LI + SPAN + LI > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child + DIV > LABEL:first-child + A + A + BUTTON > SPAN:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > A:first-child > H3:first-child > DIV:first-child"
                            ],
                            "contrastdata": [
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    true
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    2.49,
                                    "#c1e7e0",
                                    "#2a9d8f",
                                    false
                                ],
                                [
                                    1,
                                    "#ffffff",
                                    "#ffffff",
                                    true
                                ]
                            ]
                        }
                    }
                },
                "alert": {
                    "description": "Alerts",
                    "count": 22,
                    "items": {
                        "link_redundant": {
                            "id": "link_redundant",
                            "description": "Redundant link",
                            "count": 21,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER > DIV:first-child > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child"
                            ]
                        },
                        "title_redundant": {
                            "id": "title_redundant",
                            "description": "Redundant title text",
                            "count": 1,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV + STYLE + STYLE + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child"
                            ]
                        }
                    }
                },
                "feature": {
                    "description": "Features",
                    "count": 11,
                    "items": {
                        "alt_link": {
                            "id": "alt_link",
                            "description": "Linked image with alternative text",
                            "count": 11,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child + DIV > DIV:first-child > DIV:first-child > A:first-child > IMG:first-child"
                            ]
                        }
                    }
                },
                "structure": {
                    "description": "Structural Elements",
                    "count": 15,
                    "items": {
                        "h1": {
                            "id": "h1",
                            "description": "Heading level 1",
                            "count": 1,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER > DIV:first-child > DIV:first-child > DIV:first-child + DIV > A:first-child > H1:first-child"
                            ]
                        },
                        "h2": {
                            "id": "h2",
                            "description": "Heading level 2",
                            "count": 1,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER > DIV:first-child > DIV:first-child > DIV:first-child + DIV > A:first-child + H2"
                            ]
                        },
                        "h3": {
                            "id": "h3",
                            "description": "Heading level 3",
                            "count": 11,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child + DIV > DIV:first-child > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV > DIV:first-child + DIV > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child > DIV:first-child + DIV > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child > DIV:first-child > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child > DIV:first-child > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV > DIV:first-child + DIV > A:first-child > H3:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV > DIV:first-child + DIV > SECTION:first-child > HEADER:first-child + DIV + DIV + DIV + DIV > DIV:first-child + DIV + DIV > DIV:first-child + DIV > A:first-child > H3:first-child"
                            ]
                        },
                        "header": {
                            "id": "header",
                            "description": "Header",
                            "count": 1,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER"
                            ]
                        },
                        "nav": {
                            "id": "nav",
                            "description": "Navigation",
                            "count": 1,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child"
                            ]
                        }
                    }
                },
                "aria": {
                    "description": "ARIA",
                    "count": 7,
                    "items": {
                        "aria_label": {
                            "id": "aria_label",
                            "description": "ARIA label",
                            "count": 7,
                            "selectors": [
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child + HEADER > DIV:first-child > DIV:first-child > DIV:first-child + DIV > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child + DIV > LABEL:first-child + A",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child + DIV > DIV:first-child > NAV:first-child > DIV:first-child + DIV > LABEL:first-child + A + A",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV + STYLE + STYLE + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV + STYLE + STYLE + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child + SPAN + A",
                                "HTML > HEAD:first-child + BODY > DIV#container > DIV#_obv.shell._surface_1705511773062 > DIV:first-child > DIV:first-child + DIV + DIV + DIV + STYLE + STYLE + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV:first-child > A:first-child + SPAN + A + SPAN + A"
                            ]
                        }
                    }
                }
            }
        }
```