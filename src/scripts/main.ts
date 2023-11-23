function initApp() {
  // **** hambugerBtnHandler ***

  function hambugerBtnHandler() {
    const hambugerBtn: HTMLElement | null =
      document.getElementById('hamburger-button');
    const mobileMenu: HTMLElement | null =
      document.getElementById('mobile-menu');

    const toggleStates = (el: HTMLElement | null) => () => {
      if (el) {
        el.classList.toggle('hidden');
        el.classList.toggle('flex');
        hambugerBtn?.classList.toggle('toggle-btn');
      }
    };

    hambugerBtn?.addEventListener('click', toggleStates(mobileMenu));
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

  dropdownNavBarHandler();
  hambugerBtnHandler();
}

document.addEventListener('DOMContentLoaded', initApp);
