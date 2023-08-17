const SIZE_MD = 991.98;


function isMobileWindow() {
    const { innerWidth } = window;
    return innerWidth < SIZE_MD;
}

export default isMobileWindow;