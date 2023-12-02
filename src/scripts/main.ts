/* eslint-disable @typescript-eslint/no-unused-vars */

function initApp() {
  // **** hamburgerBtnHandler ***

  function hamburgerBtnHandler() {
    const hamburgerBtn: HTMLElement | null =
      document.getElementById('hamburger-button');
    const mobileMenu: HTMLElement | null =
      document.getElementById('mobile-menu');
    const body = document.getElementsByTagName('body')[0];

    const toggleStates =
      (el: HTMLElement | null, origin: string | undefined = undefined) =>
      () => {
        if (el) {
          el.classList.toggle('hidden');
          el.classList.toggle('flex');
        }
        if (origin === 'hamburgerBtn') {
          hamburgerBtn?.classList.toggle('toggle-btn');
          body?.classList.toggle('overflow-hidden');
        }
      };

    hamburgerBtn?.addEventListener(
      'click',
      toggleStates(mobileMenu, 'hamburgerBtn')
    );
    mobileMenu?.addEventListener('click', toggleStates(mobileMenu));
  }

  // **** dropdownNavBarHandler ***

  function dropdownNavBarHandler() {
    let closeTimeout: NodeJS.Timeout;
    const dropdownNavBtn: HTMLElement | null =
      document.getElementById('nav-dropdown-btn');
    const dropdownNavItems: HTMLElement | null =
      document.getElementById('nav-dropdown-items');

    dropdownNavBtn?.addEventListener(
      'mouseenter',
      () => dropdownNavItems?.classList.replace('hidden', 'flex')
    );

    dropdownNavBtn?.addEventListener('mouseleave', () => {
      // Set a timeout to close the dropdown after a short delay
      closeTimeout = setTimeout(() => {
        dropdownNavItems?.classList.replace('flex', 'hidden');
      }, 200);
    });

    // Cancel the timeout and keep the dropdown open if the mouse enters the dropdown
    dropdownNavItems?.addEventListener('mouseenter', () => {
      clearTimeout(closeTimeout);
    });

    // Resume the timeout if the mouse leaves the dropdown
    dropdownNavItems?.addEventListener('mouseleave', () => {
      closeTimeout = setTimeout(() => {
        dropdownNavItems?.classList.replace('flex', 'hidden');
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

  dropdownNavBarHandler();
  hamburgerBtnHandler();
  // contactFormHandler();
}

document.addEventListener('DOMContentLoaded', initApp);
