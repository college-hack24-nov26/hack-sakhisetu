import React from 'react';
import { AlertCircle, PackageCheck } from 'lucide-react';
import { Language } from '../types';

interface ProductLabelGuideProps {
  lang: Language;
}

export const ProductLabelGuide: React.FC<ProductLabelGuideProps> = ({ lang }) => {
  const isMarathi = lang === 'mr';
  const labelPoints = isMarathi
    ? [
        ['उत्पादनाचे नाव', 'पदार्थाचे स्पष्ट, नेहमीचे नाव लिहा.'],
        ['घटक व अॅलर्जी सूचना', 'घटकांची यादी आणि लागू असल्यास शेंगदाणे, दूध इत्यादी अॅलर्जीची माहिती द्या.'],
        ['निव्वळ वजन / प्रमाण', 'उदा. २५० ग्रॅम किंवा ५०० मिली.'],
        ['पॅकिंग व किंमत', 'लागू असल्यास पॅकिंग/उत्पादन तारीख, Best Before/Use By आणि बॅच क्रमांक; MRP (सर्व करांसह) नमूद करा.'],
        ['उत्पादकाची माहिती', 'बचत गटाचे नाव व पूर्ण पत्ता, तसेच ग्राहक संपर्क माहिती द्या.'],
        ['नियमांनुसार चिन्हे व माहिती', 'लागू असल्यास शाकाहारी/मांसाहारी चिन्ह, पोषणमूल्ये, साठवण सूचना आणि FSSAI तपशील द्या.'],
      ]
    : [
        ['Product name', 'Use the clear, common name of the food.'],
        ['Ingredients and allergen advice', 'List ingredients and disclose relevant allergens, such as peanuts or milk, where applicable.'],
        ['Net quantity', 'For example, 250 g or 500 ml.'],
        ['Dates and price', 'Where applicable, show packed/manufactured date, Best Before/Use By, batch/lot number, and MRP inclusive of taxes.'],
        ['Maker details', 'Include the SHG/packer name and full address, plus consumer contact information.'],
        ['Required marks and information', 'Add applicable veg/non-veg symbol, nutrition and storage details, and FSSAI particulars.'],
      ];

  return (
    <section
      aria-labelledby="product-label-heading"
      className="rounded-3xl border-2 border-amber-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-600 text-white">
          <PackageCheck className="h-7 w-7" />
        </div>
        <div>
          <h3 id="product-label-heading" className="text-xl font-black text-[#0F2942] sm:text-2xl">
            {isMarathi ? 'उत्पादनाच्या लेबलवर काय लिहावे?' : 'What to put on your product label'}
          </h3>
          <p className="mt-1 text-sm text-stone-600">
            {isMarathi ? 'पॅकबंद अन्नासाठी उपयुक्त तपासणी यादी' : 'A practical checklist for packaged foods'}
          </p>
        </div>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {labelPoints.map(([title, detail]) => (
          <li key={title} className="rounded-2xl border border-stone-200 bg-stone-50 p-3">
            <p className="font-bold text-stone-800">{title}</p>
            <p className="mt-1 text-sm leading-relaxed text-stone-600">{detail}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <p className="text-sm font-bold text-emerald-950">
          {isMarathi ? 'नमुना मांडणी' : 'Simple label layout'}
        </p>
        <p className="mt-2 whitespace-pre-line font-mono text-xs leading-relaxed text-stone-700">
          {isMarathi
            ? '[उत्पादनाचे नाव]\\nघटक: [...]\\nनिव्वळ प्रमाण: [...]\\nबॅच क्रमांक: [...]\\nपॅकिंग तारीख / Best Before: [...]\\nMRP (सर्व करांसह): ₹[...]\\nFSSAI नोंदणी/परवाना क्र.: [वैध क्रमांक]\\nनिर्माता/पॅकर: [बचत गटाचे नाव व पूर्ण पत्ता]'
            : '[Product name]\\nIngredients: [...]\\nNet quantity: [...]\\nBatch/Lot no.: [...]\\nPacked on / Best Before: [...]\\nMRP (incl. all taxes): ₹[...]\\nFSSAI Reg./License No.: [valid number]\\nMade/Packed by: [SHG name and full address]'}
        </p>
      </div>

      <p className="mt-4 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm font-semibold leading-relaxed text-amber-950">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <span>
          {isMarathi
            ? 'अन्नप्रकार व व्यवसायानुसार बंधनकारक माहिती बदलू शकते. FSSAI क्रमांक फक्त वैध नोंदणी/परवाना मिळाल्यावरच छापा; अंतिम लेबल FSSAI आणि Legal Metrology च्या सध्याच्या नियमांनुसार तपासा. पुरावा नसलेले “ऑर्गॅनिक” किंवा आरोग्यदावे करू नका.'
            : 'Mandatory details vary by food and business. Print an FSSAI number only after valid registration/license is issued; check the final label against current FSSAI and Legal Metrology rules. Avoid unsupported “organic” or health claims.'}
        </span>
      </p>
    </section>
  );
};
