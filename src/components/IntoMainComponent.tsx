import React from 'react';
import Section1Component from './intro_main/Section1Component';
import Section2Component from './intro_main/Section2Component';
import Section3Component from './intro_main/Section3Component';
import Section4Component from './intro_main/Section4Component';
import Section5Component from './intro_main/Section5Component';
import Section6Component from './intro_main/Section6Component';
import Section7Component from './intro_main/Section7Component';

function IntoMainComponent({$path}: any) {
    return (
        <main id='main'>
           <Section1Component />
           <Section2Component />
           <Section3Component />
           <Section4Component />
           <Section5Component />
           <Section6Component />
           <Section7Component />
        </main>
    );
};
export default IntoMainComponent;