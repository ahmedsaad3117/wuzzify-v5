import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IconSprite from "@/components/Icons";

type Section = { n: string; title: string; html: string };

type PrivacyContent = {
  tag: string;
  headingLead: string;
  headingHighlight: string;
  intro: string;
  chips: string[];
  lastUpdated: string;
  sections: Section[];
  footerNote: string;
};

const CONTENT: Record<"ar" | "en", PrivacyContent> = {
  ar: {
    tag: "مستندات قانونية",
    headingLead: "سياسة",
    headingHighlight: "الخصوصية.",
    intro:
      "نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفقاً لأنظمة المملكة العربية السعودية وجمهورية مصر العربية، وعلى رأسها <b>نظام حماية البيانات الشخصية السعودي</b> الصادر عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)، و<b>قانون حماية البيانات الشخصية المصري رقم ١٥١ لسنة ٢٠٢٠</b>.",
    chips: [
      "المملكة العربية السعودية · PDPL · سدايا",
      "جمهورية مصر العربية · قانون ١٥١ / ٢٠٢٠ · PDPC",
    ],
    lastUpdated: "آخر تحديث: ٠٩ يونيو ٢٠٢٦",
    footerNote:
      'هذه السياسة وثيقة تنظيمية عامة ولا تُعدّ بديلاً عن الاستشارة القانونية المتخصّصة. لاستفسارات قانونية أو تعاقدية محدّدة، يُرجى التواصل مع فريقنا القانوني عبر <a href="mailto:legal@wuzzify.ai">legal@wuzzify.ai</a>.',
    sections: [
      {
        n: "١",
        title: "مقدمة ونطاق التطبيق",
        html: `
          <p>تُوضّح هذه السياسة كيف تجمع منصة <b>وُظيفاي</b> (يُشار إليها بـ "نحن" أو "المنصة" أو "وُظيفاي") البيانات الشخصية، وتستخدمها، وتشاركها، وتحميها، عند استخدامك لموقعنا الإلكتروني، أو وكلاء الذكاء الاصطناعي التابعين لنا، أو أي خدمة من خدماتنا (يُشار إليها مجتمعةً بـ "الخدمات").</p>
          <p>تنطبق هذه السياسة على جميع المستخدمين والعملاء داخل المملكة العربية السعودية وجمهورية مصر العربية، وتعمل وُظيفاي بصفتها "<b>المتحكّم</b>" (Data Controller) في البيانات الشخصية وفق التعريف الوارد في:</p>
          <ul>
            <li><b>نظام حماية البيانات الشخصية</b> السعودي الصادر بالمرسوم الملكي رقم (م/١٩) وتاريخ ٩/٢/١٤٤٣هـ، وتعديلاته بالمرسوم الملكي رقم (م/١٤٨)، ولوائحه التنفيذية ولائحة نقل البيانات الشخصية إلى خارج المملكة الصادرة عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا).</li>
            <li><b>قانون حماية البيانات الشخصية</b> المصري رقم (١٥١) لسنة ٢٠٢٠ ولوائحه التنفيذية والقرارات الصادرة عن المركز المصري لحماية البيانات الشخصية (PDPC).</li>
          </ul>`,
      },
      {
        n: "٢",
        title: "تعريفات",
        html: `
          <ul>
            <li><b>البيانات الشخصية:</b> أي بيانات تُعرّفك مباشرةً أو غير مباشرة، بما فيها الاسم، البريد الإلكتروني، رقم الهاتف، الرقم الوطني/القومي، عنوان الـ IP، أو أي معرّف رقمي.</li>
            <li><b>البيانات الحساسة:</b> البيانات المتعلقة بالأصل العرقي، المعتقد الديني، الصحة، البيانات الوراثية والبيومترية، السجل الجنائي، والبيانات المالية الحساسة — وفق تعريفي النظام السعودي والقانون المصري.</li>
            <li><b>المعالجة:</b> أي عملية تُجرى على البيانات الشخصية مثل الجمع، التسجيل، التخزين، التحليل، النقل، أو الإتلاف.</li>
            <li><b>صاحب البيانات:</b> الشخص الطبيعي الذي تتعلق به البيانات الشخصية.</li>
            <li><b>المتحكّم / المعالج:</b> الجهة التي تحدد أغراض ووسائل المعالجة (المتحكّم)، أو التي تعالج البيانات نيابةً عنها (المعالج).</li>
          </ul>`,
      },
      {
        n: "٣",
        title: "البيانات التي نجمعها",
        html: `
          <h4>أ. بيانات تقدّمها أنت مباشرةً</h4>
          <ul>
            <li>الاسم، البريد الإلكتروني، رقم الجوال، اسم الجهة، المنصب.</li>
            <li>بيانات تسجيل الحساب وبيانات الفوترة (عبر مقدّمي خدمات الدفع المرخّصين).</li>
            <li>محتوى المحادثات والمستندات والملفات التي ترفعها لتدريب أو تشغيل وكلاء الذكاء الاصطناعي.</li>
          </ul>
          <h4>ب. بيانات نجمعها تلقائياً</h4>
          <ul>
            <li>عنوان IP، نوع الجهاز، نظام التشغيل، نوع المتصفح، اللغة، الموقع التقريبي.</li>
            <li>سجلات الاستخدام، أوقات الجلسات، الصفحات التي تمت زيارتها، والإجراءات داخل المنصة.</li>
            <li>ملفات تعريف الارتباط (Cookies) ومعرّفات الجلسة — راجع البند رقم ١٢.</li>
          </ul>
          <h4>ج. بيانات من مصادر طرف ثالث</h4>
          <ul>
            <li>بيانات من أنظمتك التي تربطها بمنصتنا (مثل Salesforce وHubSpot وWhatsApp Business وGmail)، بإذنك الصريح.</li>
            <li>بيانات من مزوّدي خدمات المصادقة (Google, Microsoft) عند اختيارك تسجيل الدخول عبرها.</li>
          </ul>`,
      },
      {
        n: "٤",
        title: "أغراض المعالجة وأساسها النظامي",
        html: `
          <p>نعالج بياناتك للأغراض التالية وبناءً على الأسس النظامية التالية:</p>
          <ul>
            <li><b>تنفيذ العقد:</b> تقديم الخدمات، تشغيل الحساب، الفوترة، والدعم الفني.</li>
            <li><b>الموافقة الصريحة:</b> التسويق المباشر، استخدام بياناتك لتدريب نماذج الذكاء الاصطناعي الخاصة بك، ومشاركة بياناتك مع أطراف اختيارية.</li>
            <li><b>الالتزام النظامي:</b> الامتثال للقوانين الضريبية، ومكافحة غسل الأموال، والاستجابة لطلبات الجهات المختصة.</li>
            <li><b>المصلحة المشروعة:</b> أمن المنصة، منع الاحتيال، وتحسين جودة الخدمات (دون المساس بحقوقك الأساسية).</li>
          </ul>
          <p>وفقاً للنظام السعودي والقانون المصري، يحقّ لك سحب موافقتك في أي وقت دون أن يؤثر ذلك على مشروعية المعالجة السابقة للسحب.</p>`,
      },
      {
        n: "٥",
        title: "مشاركة البيانات مع أطراف ثالثة",
        html: `
          <p>لا نبيع بياناتك الشخصية. ونشاركها فقط في الحالات التالية ووفق ضمانات تعاقدية ملزمة:</p>
          <ul>
            <li><b>مقدّمو الخدمات (المعالجون):</b> مزوّدو الاستضافة السحابية، أدوات التحليلات، خدمات البريد، ومقدّمو خدمات الدفع — وكلهم ملزمون بالسرية وبضوابط حماية البيانات.</li>
            <li><b>التكاملات بطلبك:</b> عند ربط حسابك بأنظمة خارجية (CRM، WhatsApp، البريد) فإنك توافق على تبادل البيانات اللازم لتشغيل التكامل.</li>
            <li><b>الجهات الرسمية:</b> عند وجود طلب نظامي من جهة قضائية أو رقابية مختصة في المملكة العربية السعودية أو جمهورية مصر العربية.</li>
            <li><b>عمليات الاستحواذ والاندماج:</b> مع إخطار صاحب البيانات وفق المتطلبات النظامية.</li>
          </ul>`,
      },
      {
        n: "٦",
        title: "نقل البيانات خارج الدولة",
        html: `
          <p>قد تستلزم بعض الخدمات نقل بياناتك إلى خارج المملكة العربية السعودية أو جمهورية مصر العربية. عند الحاجة لذلك:</p>
          <ul>
            <li>داخل المملكة العربية السعودية: نلتزم بـ <b>لائحة نقل البيانات الشخصية إلى خارج المملكة</b> الصادرة عن سدايا، ولا يتم النقل إلا إلى دول ذات مستوى حماية ملائم أو ضمن الضمانات المناسبة (شروط تعاقدية معتمدة، قواعد مؤسسية ملزمة، أو موافقة صريحة).</li>
            <li>داخل جمهورية مصر العربية: نلتزم بالمواد ذات الصلة من قانون ١٥١ لسنة ٢٠٢٠ والحصول على ترخيص النقل من <b>المركز المصري لحماية البيانات الشخصية</b> متى ما لزم.</li>
            <li>تُخزَّن بيانات العملاء السعوديين الحساسة داخل مراكز بيانات في المملكة العربية السعودية حيثما كان ذلك ممكناً فنّياً وتعاقدياً.</li>
          </ul>`,
      },
      {
        n: "٧",
        title: "مدة الاحتفاظ",
        html: `
          <p>نحتفظ ببياناتك الشخصية للمدة اللازمة فقط لتحقيق الأغراض الموضّحة في هذه السياسة، أو للمدة التي تفرضها الأنظمة المعمول بها. كحدّ عام:</p>
          <ul>
            <li>بيانات الحساب: طوال فترة سريان الاشتراك، ولمدة لا تتجاوز ٢٤ شهراً بعد إغلاق الحساب.</li>
            <li>سجلات الفوترة والمعاملات: لمدة لا تقل عن ١٠ سنوات وفقاً لمتطلبات الزكاة والضريبة في المملكة وقانون الضرائب المصري.</li>
            <li>محتوى المحادثات وملفات التدريب: تُحذف خلال ٩٠ يوماً من طلب الحذف، ما لم يفرض النظام خلاف ذلك.</li>
            <li>سجلات الأمن وكشف الاحتيال: حتى ٣٦ شهراً.</li>
          </ul>`,
      },
      {
        n: "٨",
        title: "أمن البيانات",
        html: `
          <p>نطبّق إجراءات تنظيمية وتقنية ملائمة لحماية بياناتك، من بينها:</p>
          <ul>
            <li>تشفير البيانات أثناء النقل (TLS 1.2 فأعلى) وأثناء التخزين (AES-256).</li>
            <li>التحكم في الصلاحيات بناءً على مبدأ الحد الأدنى من الامتيازات.</li>
            <li>المصادقة الثنائية للموظفين الذين يصلون إلى البيانات الإنتاجية.</li>
            <li>المراقبة المستمرة، اختبارات الاختراق الدورية، وخطط الاستجابة للحوادث.</li>
            <li>إخطار الجهات المختصة (سدايا في المملكة، والمركز المصري لحماية البيانات في مصر) وأصحاب البيانات بأي خرق جوهري خلال المهل النظامية المقررة.</li>
          </ul>`,
      },
      {
        n: "٩",
        title: "حقوقك كصاحب بيانات",
        html: `
          <p>يكفل لك كلا النظامين السعودي والمصري الحقوق التالية، ويمكنك ممارستها مجاناً:</p>
          <ul>
            <li><b>الحق في العِلم:</b> معرفة الأساس النظامي لجمع بياناتك وأغراض المعالجة.</li>
            <li><b>الحق في الوصول:</b> الحصول على نسخة من بياناتك لدينا.</li>
            <li><b>الحق في التصحيح والاستكمال:</b> تصحيح البيانات غير الدقيقة أو غير المكتملة.</li>
            <li><b>الحق في الإتلاف (الحذف):</b> طلب حذف بياناتك متى انتفت الحاجة إليها أو سُحبت الموافقة.</li>
            <li><b>الحق في سحب الموافقة:</b> في أي وقت ودون أثر رجعي على المعالجة السابقة.</li>
            <li><b>الحق في نقل البيانات:</b> الحصول على بياناتك بصيغة مقروءة آلياً ونقلها إلى متحكّم آخر (وفق النظام السعودي).</li>
            <li><b>الحق في الاعتراض:</b> الاعتراض على المعالجة لأغراض التسويق المباشر أو القرارات الآلية ذات الأثر الجوهري.</li>
            <li><b>الحق في التظلّم:</b> تقديم شكوى إلى الجهة الرقابية المختصة (راجع البند ١٤).</li>
          </ul>
          <p>لممارسة أيٍّ من هذه الحقوق، راسلنا على <a href="mailto:privacy@wuzzify.ai">privacy@wuzzify.ai</a>. نلتزم بالرد على طلبك خلال <b>٣٠ يوماً</b> كحدٍّ أقصى، وقد تُمدّد المدة لمدة مماثلة عند تعقيد الطلب مع إشعارك بالأسباب.</p>`,
      },
      {
        n: "١٠",
        title: "بيانات الأطفال",
        html: `<p>لا تُوجّه خدماتنا للأطفال دون سن ١٨ عاماً، ولا نجمع بياناتهم عن قصد. إذا علمنا بجمع بيانات طفل دون موافقة وليّ أمره، نبادر إلى حذفها فوراً وفق متطلبات النظام السعودي والقانون المصري.</p>`,
      },
      {
        n: "١١",
        title: "القرارات الآلية والذكاء الاصطناعي",
        html: `
          <p>تعتمد منصة وُظيفاي على وكلاء ذكاء اصطناعي قد يتخذون قرارات آلية (مثل تصنيف المحادثات، أو اقتراح الردود، أو تحديد أولوية الطلبات). عند وجود قرار آلي يُحدث أثراً قانونياً أو جوهرياً عليك، يحقّ لك:</p>
          <ul>
            <li>طلب تدخّل بشري لمراجعة القرار.</li>
            <li>التعبير عن وجهة نظرك والاعتراض على القرار.</li>
            <li>الحصول على شرح مبسّط للمنطق العام للنظام الآلي.</li>
          </ul>`,
      },
      {
        n: "١٢",
        title: "ملفات تعريف الارتباط (Cookies)",
        html: `
          <p>نستخدم ملفات تعريف الارتباط للأغراض التالية:</p>
          <ul>
            <li><b>ضرورية:</b> لتشغيل الموقع وتأمين الجلسات (لا يمكن تعطيلها).</li>
            <li><b>أداء وتحليل:</b> لقياس استخدام الموقع وتحسينه (تُفعَّل بعد موافقتك).</li>
            <li><b>تسويق:</b> لعرض إعلانات ملائمة (تُفعَّل بعد موافقتك الصريحة).</li>
          </ul>
          <p>يمكنك إدارة تفضيلاتك من إعدادات المتصفح أو من خلال شريط الموافقة الذي يظهر عند زيارتك الأولى.</p>`,
      },
      {
        n: "١٣",
        title: "تحديثات السياسة",
        html: `<p>قد نُحدّث هذه السياسة من حين لآخر بما يعكس تطوّر خدماتنا أو الالتزامات النظامية. ننشر النسخة المحدّثة على هذه الصفحة مع تاريخ التحديث، ونُخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني المسجّل لديك أو من خلال إشعار داخل المنصة.</p>`,
      },
      {
        n: "١٤",
        title: "التواصل والشكاوى",
        html: `
          <p>مسؤول حماية البيانات (DPO) لدى وُظيفاي:<br>البريد الإلكتروني: <a href="mailto:dpo@wuzzify.ai">dpo@wuzzify.ai</a><br>الاستفسارات العامة: <a href="mailto:privacy@wuzzify.ai">privacy@wuzzify.ai</a></p>
          <p>إن لم تتلقَّ رداً مرضياً، يحقّ لك تقديم شكوى إلى الجهة الرقابية المختصة:</p>
          <ul>
            <li>داخل المملكة العربية السعودية: <b>الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)</b> — <a href="https://sdaia.gov.sa" target="_blank" rel="noopener">sdaia.gov.sa</a></li>
            <li>داخل جمهورية مصر العربية: <b>المركز المصري لحماية البيانات الشخصية</b> التابع لوزارة الاتصالات وتكنولوجيا المعلومات.</li>
          </ul>`,
      },
      {
        n: "١٥",
        title: "القانون الواجب التطبيق",
        html: `<p>تخضع هذه السياسة وتُفسَّر وفقاً لأنظمة المملكة العربية السعودية لعملائنا في المملكة، ولأحكام جمهورية مصر العربية لعملائنا في مصر، مع مراعاة أيّ أحكام آمرة في الدولة التي يقيم فيها صاحب البيانات.</p>`,
      },
    ],
  },
  en: {
    tag: "Legal documents",
    headingLead: "Privacy",
    headingHighlight: "Policy.",
    intro:
      "We respect your privacy and are committed to protecting your personal data in line with the laws of the Kingdom of Saudi Arabia and the Arab Republic of Egypt — chiefly the <b>Saudi Personal Data Protection Law</b> issued by the Saudi Data and AI Authority (SDAIA), and the <b>Egyptian Personal Data Protection Law No. 151 of 2020</b>.",
    chips: [
      "Kingdom of Saudi Arabia · PDPL · SDAIA",
      "Arab Republic of Egypt · Law 151 / 2020 · PDPC",
    ],
    lastUpdated: "Last updated: 09 June 2026",
    footerNote:
      'This policy is a general regulatory document and is not a substitute for specialized legal advice. For specific legal or contractual inquiries, please contact our legal team at <a href="mailto:legal@wuzzify.ai">legal@wuzzify.ai</a>.',
    sections: [
      {
        n: "1",
        title: "Introduction & Scope",
        html: `
          <p>This policy explains how <b>Wuzzify</b> (referred to as "we", "the platform", or "Wuzzify") collects, uses, shares, and protects personal data when you use our website, our AI agents, or any of our services (collectively, the "Services").</p>
          <p>This policy applies to all users and customers within the Kingdom of Saudi Arabia and the Arab Republic of Egypt. Wuzzify acts as the "<b>Data Controller</b>" of personal data as defined in:</p>
          <ul>
            <li>The Saudi <b>Personal Data Protection Law</b> issued by Royal Decree No. (M/19) dated 9/2/1443H, as amended by Royal Decree No. (M/148), together with its implementing regulations and the Regulation on Personal Data Transfer Outside the Kingdom issued by the Saudi Data and AI Authority (SDAIA).</li>
            <li>The Egyptian <b>Personal Data Protection Law</b> No. (151) of 2020, its implementing regulations, and the decisions issued by the Egyptian Personal Data Protection Center (PDPC).</li>
          </ul>`,
      },
      {
        n: "2",
        title: "Definitions",
        html: `
          <ul>
            <li><b>Personal Data:</b> any data that identifies you directly or indirectly, including name, email, phone number, national ID, IP address, or any digital identifier.</li>
            <li><b>Sensitive Data:</b> data relating to ethnic origin, religious belief, health, genetic and biometric data, criminal record, and sensitive financial data — as defined under the Saudi and Egyptian laws.</li>
            <li><b>Processing:</b> any operation performed on personal data such as collection, recording, storage, analysis, transfer, or destruction.</li>
            <li><b>Data Subject:</b> the natural person to whom the personal data relates.</li>
            <li><b>Controller / Processor:</b> the party that determines the purposes and means of processing (Controller), or that processes data on its behalf (Processor).</li>
          </ul>`,
      },
      {
        n: "3",
        title: "Data We Collect",
        html: `
          <h4>a. Data you provide directly</h4>
          <ul>
            <li>Name, email, mobile number, organization name, job title.</li>
            <li>Account registration data and billing data (via licensed payment service providers).</li>
            <li>Content of conversations, documents, and files you upload to train or operate the AI agents.</li>
          </ul>
          <h4>b. Data we collect automatically</h4>
          <ul>
            <li>IP address, device type, operating system, browser type, language, approximate location.</li>
            <li>Usage logs, session times, pages visited, and actions within the platform.</li>
            <li>Cookies and session identifiers — see clause 12.</li>
          </ul>
          <h4>c. Data from third-party sources</h4>
          <ul>
            <li>Data from systems you connect to our platform (e.g., Salesforce, HubSpot, WhatsApp Business, Gmail), with your explicit permission.</li>
            <li>Data from authentication providers (Google, Microsoft) when you choose to sign in through them.</li>
          </ul>`,
      },
      {
        n: "4",
        title: "Purposes & Lawful Basis of Processing",
        html: `
          <p>We process your data for the following purposes and on the following lawful bases:</p>
          <ul>
            <li><b>Contract performance:</b> providing the Services, operating the account, billing, and technical support.</li>
            <li><b>Explicit consent:</b> direct marketing, using your data to train your own AI models, and sharing your data with optional parties.</li>
            <li><b>Legal obligation:</b> compliance with tax laws, anti-money-laundering, and responding to requests from competent authorities.</li>
            <li><b>Legitimate interest:</b> platform security, fraud prevention, and improving service quality (without prejudice to your fundamental rights).</li>
          </ul>
          <p>Under the Saudi and Egyptian laws, you have the right to withdraw your consent at any time without affecting the lawfulness of processing carried out before withdrawal.</p>`,
      },
      {
        n: "5",
        title: "Sharing Data with Third Parties",
        html: `
          <p>We do not sell your personal data. We share it only in the following cases and under binding contractual safeguards:</p>
          <ul>
            <li><b>Service providers (processors):</b> cloud hosting providers, analytics tools, email services, and payment providers — all bound by confidentiality and data protection controls.</li>
            <li><b>Integrations at your request:</b> when you connect your account to external systems (CRM, WhatsApp, email), you consent to the data exchange necessary to run the integration.</li>
            <li><b>Official authorities:</b> upon a lawful request from a competent judicial or regulatory authority in the Kingdom of Saudi Arabia or the Arab Republic of Egypt.</li>
            <li><b>Mergers and acquisitions:</b> with notice to the data subject in accordance with regulatory requirements.</li>
          </ul>`,
      },
      {
        n: "6",
        title: "Cross-Border Data Transfers",
        html: `
          <p>Some Services may require transferring your data outside the Kingdom of Saudi Arabia or the Arab Republic of Egypt. Where needed:</p>
          <ul>
            <li>Within Saudi Arabia: we comply with the <b>Regulation on Personal Data Transfer Outside the Kingdom</b> issued by SDAIA; transfers occur only to countries with an adequate level of protection or under appropriate safeguards (approved contractual clauses, binding corporate rules, or explicit consent).</li>
            <li>Within Egypt: we comply with the relevant articles of Law 151 of 2020 and obtain a transfer license from the <b>Egyptian Personal Data Protection Center</b> whenever required.</li>
            <li>Sensitive data of Saudi customers is stored in data centers within the Kingdom of Saudi Arabia wherever technically and contractually feasible.</li>
          </ul>`,
      },
      {
        n: "7",
        title: "Retention Period",
        html: `
          <p>We retain your personal data only for as long as necessary to achieve the purposes described in this policy, or for the period required by applicable laws. As a general rule:</p>
          <ul>
            <li>Account data: throughout the subscription period and for no more than 24 months after account closure.</li>
            <li>Billing and transaction records: for at least 10 years in accordance with Zakat and tax requirements in the Kingdom and Egyptian tax law.</li>
            <li>Conversation content and training files: deleted within 90 days of a deletion request, unless the law requires otherwise.</li>
            <li>Security and fraud-detection logs: up to 36 months.</li>
          </ul>`,
      },
      {
        n: "8",
        title: "Data Security",
        html: `
          <p>We apply appropriate organizational and technical measures to protect your data, including:</p>
          <ul>
            <li>Encryption of data in transit (TLS 1.2+) and at rest (AES-256).</li>
            <li>Access control based on the principle of least privilege.</li>
            <li>Two-factor authentication for staff accessing production data.</li>
            <li>Continuous monitoring, periodic penetration testing, and incident response plans.</li>
            <li>Notifying the competent authorities (SDAIA in the Kingdom, and the Egyptian Personal Data Protection Center in Egypt) and data subjects of any material breach within the prescribed statutory timeframes.</li>
          </ul>`,
      },
      {
        n: "9",
        title: "Your Rights as a Data Subject",
        html: `
          <p>Both the Saudi and Egyptian laws grant you the following rights, which you may exercise free of charge:</p>
          <ul>
            <li><b>Right to be informed:</b> to know the lawful basis for collecting your data and the purposes of processing.</li>
            <li><b>Right of access:</b> to obtain a copy of the data we hold about you.</li>
            <li><b>Right to rectification and completion:</b> to correct inaccurate or incomplete data.</li>
            <li><b>Right to erasure (deletion):</b> to request deletion of your data when it is no longer needed or consent is withdrawn.</li>
            <li><b>Right to withdraw consent:</b> at any time, without retroactive effect on prior processing.</li>
            <li><b>Right to data portability:</b> to obtain your data in a machine-readable format and transfer it to another controller (under the Saudi law).</li>
            <li><b>Right to object:</b> to object to processing for direct marketing or automated decisions with material effect.</li>
            <li><b>Right to complain:</b> to file a complaint with the competent supervisory authority (see clause 14).</li>
          </ul>
          <p>To exercise any of these rights, contact us at <a href="mailto:privacy@wuzzify.ai">privacy@wuzzify.ai</a>. We commit to responding to your request within <b>30 days</b> at most, which may be extended by an equal period for complex requests, with notice of the reasons.</p>`,
      },
      {
        n: "10",
        title: "Children's Data",
        html: `<p>Our Services are not directed to children under the age of 18, and we do not knowingly collect their data. If we learn that we have collected a child's data without parental consent, we promptly delete it in accordance with the Saudi and Egyptian laws.</p>`,
      },
      {
        n: "11",
        title: "Automated Decisions & AI",
        html: `
          <p>Wuzzify relies on AI agents that may make automated decisions (such as classifying conversations, suggesting replies, or prioritizing requests). Where an automated decision produces a legal or material effect on you, you have the right to:</p>
          <ul>
            <li>Request human intervention to review the decision.</li>
            <li>Express your point of view and object to the decision.</li>
            <li>Obtain a simplified explanation of the general logic of the automated system.</li>
          </ul>`,
      },
      {
        n: "12",
        title: "Cookies",
        html: `
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li><b>Essential:</b> to operate the site and secure sessions (cannot be disabled).</li>
            <li><b>Performance & analytics:</b> to measure and improve site usage (enabled after your consent).</li>
            <li><b>Marketing:</b> to show relevant ads (enabled after your explicit consent).</li>
          </ul>
          <p>You can manage your preferences from your browser settings or via the consent banner shown on your first visit.</p>`,
      },
      {
        n: "13",
        title: "Policy Updates",
        html: `<p>We may update this policy from time to time to reflect changes in our Services or legal obligations. We publish the updated version on this page with the update date, and notify you of any material changes via your registered email or through an in-platform notice.</p>`,
      },
      {
        n: "14",
        title: "Contact & Complaints",
        html: `
          <p>Wuzzify's Data Protection Officer (DPO):<br>Email: <a href="mailto:dpo@wuzzify.ai">dpo@wuzzify.ai</a><br>General inquiries: <a href="mailto:privacy@wuzzify.ai">privacy@wuzzify.ai</a></p>
          <p>If you do not receive a satisfactory response, you have the right to file a complaint with the competent supervisory authority:</p>
          <ul>
            <li>Within Saudi Arabia: the <b>Saudi Data and AI Authority (SDAIA)</b> — <a href="https://sdaia.gov.sa" target="_blank" rel="noopener">sdaia.gov.sa</a></li>
            <li>Within Egypt: the <b>Egyptian Personal Data Protection Center</b> under the Ministry of Communications and Information Technology.</li>
          </ul>`,
      },
      {
        n: "15",
        title: "Governing Law",
        html: `<p>This policy is governed by and construed in accordance with the laws of the Kingdom of Saudi Arabia for our customers in the Kingdom, and the laws of the Arab Republic of Egypt for our customers in Egypt, subject to any mandatory provisions of the country in which the data subject resides.</p>`,
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const c = locale === "en" ? CONTENT.en : CONTENT.ar;
  return {
    title:
      locale === "en"
        ? "Privacy Policy — Wuzzify"
        : "سياسة الخصوصية — وُظيفاي",
    description: c.intro.replace(/<[^>]+>/g, ""),
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = locale === "en" ? CONTENT.en : CONTENT.ar;

  return (
    <>
      <IconSprite />
      <Nav />
      <main>
        <section className="bg-wash border-y border-line py-20 lg:py-24">
          <div className="max-w-[900px] mx-auto px-6 lg:px-10">
            <div className="text-center mb-12">
              <span className="inline-block text-[11px] font-bold tracking-[0.2em] uppercase text-brand-600 bg-white border border-line px-2.5 py-1 rounded-xs">
                {c.tag}
              </span>
              <h1 className="display text-[36px] lg:text-[44px] mt-4">
                {c.headingLead}{" "}
                <span className="grad-text">{c.headingHighlight}</span>
              </h1>
              <p
                className="mt-5 text-[16.5px] leading-loose text-ink-2 max-w-[60ch] mx-auto"
                dangerouslySetInnerHTML={{ __html: c.intro }}
              />
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {c.chips.map((chip) => (
                  <span key={chip} className="law-chip">
                    <span className="dot" />
                    {chip}
                  </span>
                ))}
              </div>
              <p className="num mt-5 text-[12.5px] text-ink-3">{c.lastUpdated}</p>
            </div>

            <div className="policy bg-white border border-line rounded-xl p-7 lg:p-10 shadow-card">
              {c.sections.map((s) => (
                <div key={s.n}>
                  <h3>
                    <span className="num-chip num">{s.n}</span>
                    {s.title}
                  </h3>
                  <div dangerouslySetInnerHTML={{ __html: s.html }} />
                </div>
              ))}

              <div className="mt-12 p-5 border border-line rounded-lg bg-wash">
                <p
                  className="text-[13.5px] text-ink-3 m-0"
                  dangerouslySetInnerHTML={{ __html: c.footerNote }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
