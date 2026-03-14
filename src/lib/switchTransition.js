export function switchTransition (event, switchTheme) {
    if (!document.startViewTransition) {
        switchTheme();
        return;
    }

    const x = event.clientX;
    const y = event.clientY;

    const transition = document.startViewTransition(() => {
        switchTheme();
    });

    transition.ready.then(() => {
        const radius = Math.hypot(
            window.innerWidth - x,
            window.innerHeight - y
        );
        
        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${radius}px at ${x}px ${y}px)`
                ]
            },
            {
                duration: 280,
                easing: "ease-in",
                pseudoElement: "::view-transition-new(root)"
            }
        );
    });
}