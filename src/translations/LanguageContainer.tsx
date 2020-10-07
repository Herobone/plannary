
import * as React from 'react';
import messages_en from './locales/en.json';
import messages_de from './locales/de.json';
import { IntlProvider } from 'react-intl';
import { withCookies, Cookies } from 'react-cookie';
import Routed from '../Routed';

interface State {
    locale: string
}

const MESSAGES = {
    'en': messages_en,
    'de': messages_de
};

interface Props {
    cookies: Cookies
}

class LanguageContainer extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        let lang = props.cookies.get("locale");
        if (!lang || typeof lang === "undefined") {
            lang = navigator.language.split("-")[0];
        }
        if (!this.hasKey(MESSAGES, lang)) {
            lang = "de";
        }
        this.state = {
            locale: lang
        }
    }

    public changeLanguage = (locale: string) => {
        const { cookies } = this.props;
        cookies.set("locale", locale, { expires: new Date(9999, 12) })
        this.setState({
            locale
        });
    }

    hasKey<O>(obj: O, key: keyof any): key is keyof O {
        return key in obj
    }

    public render() {
        const { locale } = this.state;
        let msg = {};
        if (this.hasKey(MESSAGES, locale)) {
            msg = MESSAGES[locale];
        }

        return (
            <IntlProvider locale={locale} messages={msg}>
                <Routed changeLanguage={this.changeLanguage} currentLocale={locale} />
            </IntlProvider>
        );
    }
}

export default withCookies(LanguageContainer);