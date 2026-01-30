import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
    en: {
        nav: { home: 'Home', prayer: 'Prayer Times', about: 'About', services: 'Services', events: 'Events', contact: 'Contact', donate: 'Donate' },
        hero: { title: '<span class="bg-gradient-to-br from-accent-200 via-accent-400 to-accent-600 bg-clip-text text-transparent">Young Minds Gather - Purpose Awakens</span>', subtitle: 'To grow with understanding, resilience and purposeful intention.' },
        footer: {
            about: 'Serving the Glasgow community with prayer services, education, and spiritual guidance. A sanctuary for all.',
            supportMasjid: 'Support Your Masjid',
            donationsRunMasjid: 'Your donations run the Masjid and our community services.'
        }
    },
    ur: {
        nav: { home: 'ہوم', prayer: 'نماز کے اوقات', about: 'ہمارے بارے میں', services: 'خدمات', events: 'پروگرام', contact: 'رابطہ', donate: 'عطیہ' },
        hero: { title: '<span class="text-accent-500">نور</span> اور <span class="text-accent-500">علم</span> کا مینارہ', subtitle: 'گلاسگو کے قلب میں کمیونٹی کی خدمت' },
        footer: {
            about: 'گلاسگو کمیونٹی کی نماز، تعلیم اور روحانی رہنمائی کے ساتھ خدمت۔ سب کے لیے ایک پناہ گاہ۔',
            supportMasjid: 'اپنے مسجد کی مدد کریں',
            donationsRunMasjid: 'آپ کے عطیات مسجد اور ہماری کمیونٹی سروسز کو چلاتے ہیں۔'
        }
    },
    ar: {
        nav: { home: 'الرئيسية', prayer: 'أوقات الصلاة', about: 'من نحن', services: 'خدماتنا', events: 'الفعاليات', contact: 'اتصل بنا', donate: 'تبرع' },
        hero: { title: 'منارة <span class="text-accent-500">النور</span> و<span class="text-accent-500">المعرفة</span>', subtitle: 'خدمة المجتمع في قلب غلاسكو' },
        footer: {
            about: 'خدمة مجتمع غلاسكو بخدمات الصلاة والتعليم والإرشاد الروحي. ملاذ للجميع.',
            supportMasjid: 'دعم مسجدكم',
            donationsRunMasjid: 'تبرعاتكم تدعم المسجد وخدماتنا المجتمعية.'
        }
    }
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[language];
        for (const key of keys) {
            if (result[key]) {
                result = result[key];
            } else {
                return path;
            }
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            <div dir={language === 'en' ? 'ltr' : 'rtl'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
