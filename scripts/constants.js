export const DEPTH = {
    BATTLE: {
        BORAD: 400,
        BULLET: {
            INSIDE: 500,
            OUTSIDE: {
                LOW: 700,
                HIGH: 1000
            },
        },
        SOUL: 800,

        UI: {
            LOW: 300,
            HIGH: 700
        },

    }
}

export function normalizeKey(key) {
    key = key.toUpperCase();

    const map = {
        "CONTROL": "CTRL",
        "SHIFT": "SHIFT",
        "ALT": "ALT",
        "META": "META",
        "ESCAPE": "ESC",
        " ": "SPACE",
        "ARROWUP": "UP",
        "ARROWDOWN": "DOWN",
        "ARROWLEFT": "LEFT",
        "ARROWRIGHT": "RIGHT",
        "ENTER": "ENTER",
        "TAB": "TAB",
        "BACKSPACE": "BACKSPACE"
    };

    if (map[key]) return map[key];

    // 記号そのまま
    if (key.length === 1) return key;

    return key;
}
