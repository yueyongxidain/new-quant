import React, { PureComponent, Fragment } from 'react';
import { GlobalFooter, language } from 'quant-ui';
import CONFIG from "@/common/config";
let $ = language.getLanguageData;
const copyright = (
    <Fragment>
        {CONFIG.FOOTER}
    </Fragment>
);

export default class Footer extends PureComponent {
    render() {
        const links = [
            {
                key: 'help',
                title: $('帮助'),
                href: CONFIG.Help,
                download: $('帮助'),
            },
            {
                key: 'privacy',
                title: $('关于'),
                onClick: this.privacyClick
            },
            {
                key: 'terms',
                title: $('条款')
            },
        ];
        return (
            <GlobalFooter links={links} copyright={copyright} />
        );
    }
}
