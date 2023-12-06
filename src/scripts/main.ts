import "aos/dist/aos.css";
import "keen-slider/keen-slider.min.css";
import AOS from "aos";
import KeenSlider from "keen-slider";

/* eslint-disable @typescript-eslint/no-unused-vars */

function initApp() {
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
              perView: 1.5,
              spacing: 32,
            },
          },
        },
      },
      [],
    );

    const keenSliderPrevious = document.getElementById("keen-slider-previous");
    const keenSliderNext = document.getElementById("keen-slider-next");

    const keenSliderPreviousDesktop = document.getElementById(
      "keen-slider-previous-desktop",
    );
    const keenSliderNextDesktop = document.getElementById(
      "keen-slider-next-desktop",
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

  // **** dropdownNavBarHandler ***

  function dropdownNavBarHandler() {
    let closeTimeout: NodeJS.Timeout;
    const dropdownNavBtn: HTMLElement | null =
      document.getElementById("nav-dropdown-btn");
    const dropdownNavItems: HTMLElement | null =
      document.getElementById("nav-dropdown-items");

    dropdownNavBtn?.addEventListener(
      "mouseenter",
      () => dropdownNavItems?.classList.replace("hidden", "flex"),
    );

    dropdownNavBtn?.addEventListener("mouseleave", () => {
      // Set a timeout to close the dropdown after a short delay
      closeTimeout = setTimeout(() => {
        dropdownNavItems?.classList.replace("flex", "hidden");
      }, 200);
    });

    // Cancel the timeout and keep the dropdown open if the mouse enters the dropdown
    dropdownNavItems?.addEventListener("mouseenter", () => {
      clearTimeout(closeTimeout);
    });

    // Resume the timeout if the mouse leaves the dropdown
    dropdownNavItems?.addEventListener("mouseleave", () => {
      closeTimeout = setTimeout(() => {
        dropdownNavItems?.classList.replace("flex", "hidden");
      }, 200);
    });
  }

  // Contact form handler
  function contactFormHandler() {
    // form
    const contactForm: HTMLFormElement | null = document.getElementById(
      "contact-form",
    ) as HTMLFormElement;

    // notifications
    const notifications: Element | null =
      document.getElementById("notification");

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
  dropdownNavBarHandler();
  hamburgerBtnHandler();
  contactFormHandler();
  sliderHandler();
  testimonialHandler();
}

document.addEventListener("DOMContentLoaded", initApp);
