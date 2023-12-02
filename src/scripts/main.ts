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

    const toggleStates =
      (el: HTMLElement | null, origin: string | undefined = undefined) =>
      () => {
        if (el) {
          el.classList.toggle("hidden");
          el.classList.toggle("flex");
        }
        if (origin === "hamburgerBtn") {
          hamburgerBtn?.classList.toggle("toggle-btn");
          body?.classList.toggle("overflow-hidden");
        }
      };

    hamburgerBtn?.addEventListener(
      "click",
      toggleStates(mobileMenu, "hamburgerBtn"),
    );
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

  // function contactFormHandler() {
  //   const contactForm: HTMLElement | null =
  //     document.getElementById('contact-form');

  //   contactForm?.addEventListener('submit', (e: any) => {
  //     e.preventDefault();

  //     const formData = new FormData(e.target);
  //     const formProps = Object.fromEntries(formData);

  //     fetch(`/contactForm/sendEmail`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formProps),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.success) {
  //           window.location.href = `/success.html`;
  //         } else {
  //           alert('Error sending the contact form. Please try again.');
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error:', error);
  //       });
  //   });
  // }

  copyrightYear();
  dropdownNavBarHandler();
  hamburgerBtnHandler();
  // contactFormHandler();
  sliderHandler();
  testimonialHandler();
}

document.addEventListener("DOMContentLoaded", initApp);
