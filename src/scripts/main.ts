import "aos/dist/aos.css";
import "keen-slider/keen-slider.min.css";
import AOS from "aos";
import KeenSlider from "keen-slider";
import { Plugin } from "intl-tel-input";

/* eslint-disable @typescript-eslint/no-unused-vars */

function initApp() {
  const keenSliderEl = document.getElementById("keen-slider");
  const keenSliderPrevious = document.getElementById("keen-slider-previous");
  const keenSliderNext = document.getElementById("keen-slider-next");
  const phoneInputField = document.querySelector("#reportContactNumber");
  let phoneInput: Plugin;

  const keenSliderPreviousDesktop = document.getElementById(
    "keen-slider-previous-desktop",
  );
  const keenSliderNextDesktop = document.getElementById(
    "keen-slider-next-desktop",
  );

  // Product click handler
  function productClickHandler() {
    const categoryLinks =
      document.querySelectorAll<HTMLAnchorElement>("li[data-category]");

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();

      // Get product-title element
      const productTitle: HTMLElement | null =
        document.getElementById("product-title");

      // Get category from link
      const target = e.target as HTMLElement;
      const { category } = target.dataset;

      // Handle link color
      categoryLinks.forEach((cat) => cat.classList.remove("text-primary"));
      target.classList.add("text-primary");
      target.classList.remove("text-dark");

      // Get all products
      const products = document.querySelectorAll<HTMLDivElement>(".product");
      const productImage = document.getElementById(
        "productImage",
      ) as HTMLImageElement;

      // Show all products if "All" is selected
      if (!category || category.toLowerCase() === "all") {
        products.forEach((product) => {
          product.classList.remove("hidden");
          product.classList.add("flex");
        });
        if (productTitle) productTitle.innerHTML = `All Products`;
        return;
      }

      // Append category to productTitle '
      if (productTitle) {
        const cat = category;
        productTitle.innerHTML = `Products in ${cat}`;
        const imgName = cat.split(" ").join("").toLowerCase();
        productImage!.srcset = `img/products/${imgName}.webp`;
      }

      // Show all matching products, hide others
      products.forEach((product) => {
        const productCategory = product.getAttribute("data-category");

        if (productCategory === category) {
          product.classList.remove("hidden");
          product.classList.add("flex");
        } else {
          product.classList.remove("flex");
          product.classList.add("hidden");
        }
      });
    };

    categoryLinks.forEach((link) => {
      link.addEventListener("click", handleClick);
    });
  }

  // Accordion
  function accordionHandler() {
    const items: NodeListOf<Element> = document.querySelectorAll(
      ".accordion-item .header",
    );

    items.forEach((item) => {
      item.addEventListener("click", (e) => {
        const header: Element = e.currentTarget as Element;
        const content: Element = header.parentElement?.querySelector(
          ".content",
        ) as Element;
        const arrowDown: Element = header.querySelector(
          ".arrow-down",
        ) as Element;
        const arrowUp: Element = header.querySelector(".arrow-up") as Element;
        arrowDown.classList.toggle("hidden");
        arrowUp.classList.toggle("hidden");
        content.classList.toggle("hidden");
      });
    });
  }

  // Animate on scroll
  AOS.init({
    duration: 1200,
    easing: "ease-in-out-back",
  });

  // Copyright year
  function copyrightYear() {
    const date: string = new Date().getFullYear() as unknown as string;
    const year: Element | null = document.getElementById("copyrightYear");
    if (year) year.innerHTML = date;
  }

  // Testimonial
  function testimonialHandler() {
    const keenSlider = new KeenSlider(
      "#keen-slider",
      {
        loop: true,
        slides: {
          origin: "center",
          perView: 1.25,
          spacing: 16,
        },
        breakpoints: {
          "(min-width: 1024px)": {
            slides: {
              origin: "auto",
              perView: 2,
              spacing: 32,
            },
          },
        },
      },
      [],
    );

    keenSliderPrevious?.addEventListener("click", () => keenSlider.prev());
    keenSliderNext?.addEventListener("click", () => keenSlider.next());

    keenSliderPreviousDesktop?.addEventListener("click", () =>
      keenSlider.prev(),
    );
    keenSliderNextDesktop?.addEventListener("click", () => keenSlider.next());
  }

  // Partners sliders
  function sliderHandler() {
    const sliderClone: Element | undefined = document
      .querySelector(".logo-slide")
      ?.cloneNode(true) as Element | undefined;
    sliderClone?.setAttribute("aria-label", "hidden");

    const sliderContainer: Element | null = document.querySelector(".logos");

    // sliderClone?.classList.add("hover:pause-animation");

    if (sliderClone) sliderContainer?.appendChild(sliderClone);

    sliderContainer?.addEventListener("mouseenter", () => {
      const sliders = document.querySelectorAll(".logo-slide");
      sliders.forEach((row) => row.classList.add("pause-animation"));
    });

    sliderContainer?.addEventListener("mouseleave", () => {
      const sliders = document.querySelectorAll(".logo-slide");
      sliders.forEach((row) => row.classList.remove("pause-animation"));
    });
  }

  // **** hamburgerBtnHandler ***

  function hamburgerBtnHandler() {
    const hamburgerBtn: HTMLElement | null =
      document.getElementById("hamburger-button");
    const mobileMenu: HTMLElement | null =
      document.getElementById("mobile-menu");
    const body = document.getElementsByTagName("body")[0];

    const toggleStates = (el: HTMLElement | null) => () => {
      if (el) {
        el.classList.toggle("hidden");
        el.classList.toggle("flex");
        hamburgerBtn?.classList.toggle("toggle-btn");
        body?.classList.toggle("overflow-hidden");
      }
    };

    hamburgerBtn?.addEventListener("click", toggleStates(mobileMenu));
    mobileMenu?.addEventListener("click", toggleStates(mobileMenu));
  }

  function scrollToProducts() {
    if (window.innerWidth <= 1024) {
      const menuItems = document.querySelectorAll("#product-menu li");

      menuItems.forEach((item) => {
        item.addEventListener("click", () => {
          // Extract the target section ID from the data-category attribute
          // let sectionId = this.getAttribute("data-category");
          const section = document.getElementById("products");

          // Scroll to the corresponding section
          if (section) {
            section.scrollIntoView({ behavior: "smooth" });
          }
        });
      });
    }
  }

  function closePopupForm(event: Event) {
    const targetElement = event.target as Element;

    // Check if the click event occurred inside the form
    if (!targetElement?.closest(".popup-content")) {
      // Hide the overlay and form
      const overlay = document.getElementById("services-popup");
      overlay?.classList.remove("fixed");
      overlay?.classList.remove("flex");
      overlay?.classList.add("hidden");
      overlay?.setAttribute("aria-hidden", "true");

      // Remove event listener to close the popup when clicking outside the form
      overlay?.removeEventListener("click", closePopupForm);

      // Allow scrolling of the background content
      document.body.classList.remove("overflow-hidden");
    }
  }

  function openPopupForm() {
    // Show the overlay and form
    const overlay = document.getElementById("services-popup");
    overlay?.classList.remove("hidden");
    overlay?.classList.add("fixed");
    overlay?.classList.add("flex");
    overlay?.setAttribute("aria-hidden", "false");
    overlay?.focus(); // Set focus to the overlay for accessibility

    // Add event listener to close the popup when clicking outside the form
    overlay?.addEventListener("click", closePopupForm);

    // Prevent scrolling of the background content when the popup is open
    document.body.classList.add("overflow-hidden");
  }

  // Add event listener to open the popup form when clicking on a specific element
  const openPopupButton = document.getElementById("open-popup-button");
  openPopupButton?.addEventListener("click", openPopupForm);

  // Add event listener to close the popup form when clicking on the close button
  const closePopupButton = document.getElementById("popup-close");
  closePopupButton?.addEventListener("click", closePopupForm);

  function reportIssueFormHandler() {
    phoneInput = window.intlTelInput(phoneInputField!, {
      preferredCountries: ["tz", "us", "gb"],
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    // form
    const reportIssueForm = document.getElementById(
      "reportIssue",
    ) as HTMLFormElement;

    // notifications
    const notifications = document.getElementById("notification");

    reportIssueForm?.addEventListener("submit", (e: any) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      // Remove the original phone input field from the FormData object
      formData.delete("reportContactNumber");

      // Append the formatted phone number to the FormData object
      formData.append("phone", phoneInput.getNumber());

      // Convert FormData to plain JavaScript object
      const formProps: Record<string, string> = {};

      formData.forEach((value, key) => {
        formProps[key] = value.toString();
      });

      // Hide the overlay and form
      const overlay = document.getElementById("services-popup");

      overlay?.classList.remove("fixed");
      overlay?.classList.remove("flex");
      overlay?.classList.add("hidden");
      overlay?.setAttribute("aria-hidden", "true");
      // Allow scrolling of the background content
      document.body.classList.remove("overflow-hidden");

      fetch(`php/reportIssue.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // Convert data to URL-encoded form data
        body: new URLSearchParams(formProps).toString(),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((resData) => {
          if (resData.success) {
            // Reset form
            reportIssueForm?.reset();

            if (notifications) {
              notifications.classList.remove("hidden");
              notifications.innerHTML = `
              <div
                class="mb-3 inline-flex items-center rounded-lg bg-green-100 px-6 py-5 text-base text-green-700 z-50"
                role="alert"
              >
                <span class="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
                ${resData.message}
              </div>
                `;

              setTimeout(() => {
                notifications.innerHTML = "";
              }, 3000);
            }
          } else if (notifications) {
            notifications.classList.remove("hidden");
            notifications.innerHTML = `
              <div
                class="mb-3 inline-flex items-center rounded-lg bg-red-100 px-6 py-5 text-base text-red-700 z-50"
                role="alert"
              >
                <span class="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                ${resData.message}
              </div>
              `;

            setTimeout(() => {
              notifications.innerHTML = "";
            }, 3000);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
  // **** dropdownNavBarHandler ***

  // function dropdownNavBarHandler() {
  //   let closeTimeout: NodeJS.Timeout;
  //   const dropdownNavBtn: HTMLElement | null =
  //     document.getElementById("nav-dropdown-btn");
  //   const dropdownNavItems: HTMLElement | null =
  //     document.getElementById("nav-dropdown-items");

  //   dropdownNavBtn?.addEventListener(
  //     "mouseenter",
  //     () => dropdownNavItems?.classList.replace("hidden", "flex"),
  //   );

  //   dropdownNavBtn?.addEventListener("mouseleave", () => {
  //     // Set a timeout to close the dropdown after a short delay
  //     closeTimeout = setTimeout(() => {
  //       dropdownNavItems?.classList.replace("flex", "hidden");
  //     }, 200);
  //   });

  //   // Cancel the timeout and keep the dropdown open if the mouse enters the dropdown
  //   dropdownNavItems?.addEventListener("mouseenter", () => {
  //     clearTimeout(closeTimeout);
  //   });

  //   // Resume the timeout if the mouse leaves the dropdown
  //   dropdownNavItems?.addEventListener("mouseleave", () => {
  //     closeTimeout = setTimeout(() => {
  //       dropdownNavItems?.classList.replace("flex", "hidden");
  //     }, 200);
  //   });
  // }

  // NavBar
  function navBarLinksHandler() {
    const navBarLinks = document.querySelectorAll(".nav-link");

    const applyStyles = () => {
      // Remove "text-primary" class from all links
      navBarLinks.forEach((link) => {
        link.classList.remove("text-primary");
        link.classList.add("text-dark");
      });

      // Get the keyword from the data attribute
      navBarLinks.forEach((link) => {
        const keyword = link.getAttribute("data-keyword");

        // Check if the current href includes the specified keyword
        if (
          keyword &&
          (window.location.href.toLowerCase().includes(keyword) ||
            (keyword === "home" && window.location.href.endsWith("/")))
        ) {
          link.classList.add("text-primary");
          link.classList.remove("text-dark");
        }
      });
    };

    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;

      // Check if the clicked link is already selected
      if (target.classList.contains("text-primary")) {
        return;
      }

      // Save the selected link's index to localStorage
      const selectedIndex = Array.from(navBarLinks).indexOf(target);
      localStorage.setItem("selectedLink", selectedIndex.toString());

      // Apply styles based on the new href
      applyStyles();
    };

    // Add click event listener to each link
    navBarLinks.forEach((link) => {
      link.addEventListener("click", (e: Event) => {
        handleClick(e);
      });

      // Check if there is a selected link in localStorage and apply the style
      const selectedIndex: string | null = localStorage.getItem("selectedLink");
      if (selectedIndex && link.classList.contains("nav-link")) {
        link.classList.add("text-primary");
        link.classList.remove("text-dark");
      }
    });

    // Listen for hash changes
    window.addEventListener("hashchange", () => {
      // Apply styles based on the new href
      applyStyles();
    });

    // Apply styles initially when the page loads
    applyStyles();
  }

  // Contact form handler
  function contactFormHandler() {
    // form
    const contactForm = document.getElementById(
      "contact-form",
    ) as HTMLFormElement;

    // notifications
    const notifications = document.getElementById("notification");

    contactForm?.addEventListener("submit", (e: any) => {
      e.preventDefault();

      const formData = new FormData(e.target);

      // Convert FormData to plain JavaScript object
      const formProps: Record<string, string> = {};

      formData.forEach((value, key) => {
        formProps[key] = value.toString();
      });

      fetch(`php/sendEmail.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // Convert data to URL-encoded form data
        body: new URLSearchParams(formProps).toString(),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((resData) => {
          if (resData.success) {
            // Reset form
            contactForm?.reset();

            if (notifications) {
              notifications.classList.remove("hidden");
              notifications.innerHTML = `
              <div
                class="mb-3 inline-flex items-center rounded-lg bg-green-100 px-6 py-5 text-base text-green-700"
                role="alert"
              >
                <span class="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clip-rule="evenodd" />
                  </svg>
                </span>
                ${resData.message}
              </div>
                `;

              setTimeout(() => {
                notifications.innerHTML = "";
              }, 3000);
            }
          } else if (notifications) {
            notifications.classList.remove("hidden");
            notifications.innerHTML = `
              <div
                class="mb-3 inline-flex items-center rounded-lg bg-red-100 px-6 py-5 text-base text-red-700"
                role="alert"
              >
                <span class="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="h-5 w-5"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
                ${resData.message}
              </div>
              `;

            setTimeout(() => {
              notifications.innerHTML = "";
            }, 3000);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  copyrightYear();
  // dropdownNavBarHandler();
  navBarLinksHandler();
  hamburgerBtnHandler();
  contactFormHandler();
  sliderHandler();
  scrollToProducts();
  if (keenSliderEl) testimonialHandler();
  if (phoneInputField) reportIssueFormHandler();
  accordionHandler();
  productClickHandler();
}

// Loader
function pageLoader() {
  const loader = document.querySelector(".loader");
  loader?.classList.add("hidden");
  loader?.classList.add("opacity-0");
}

window.addEventListener("load", pageLoader);
document.addEventListener("DOMContentLoaded", initApp);
