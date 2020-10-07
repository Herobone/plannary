class Util {
    static random(from: number, to: number): number {
        return Math.floor((Math.random() * to) + from);
    }

    static randomCharOrNumber(): string {
        const num = this.random(0, 35);
        return this.charOrNumber(num);
    }

    static charOrNumber(num: number): string {
        let str: string;
        if (num < 26) {
            str = String.fromCharCode(65 + num);
        } else {
            str = String(num - 26);
        }
        return str;
    }

    static randomCharOrNumberSequence(len: number): string {
        let sequ = "";

        for (let index = 0; index < len; index++) {
            sequ += this.randomCharOrNumber();

        }

        return sequ;
    }

    static alphanumeric(text: string) {
        const letters = /^[0-9a-zA-Z]+$/ig;
        return text.match(letters);
    }
}

export default Util