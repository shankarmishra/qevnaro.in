# Qevnaro ranking checklist: Google aur AI assistants mein upar aane ke liye

Website ab crawlers aur AI assistants ke liye poori tarah readable hai: 198 pages static HTML mein, har page ka apna title, schema aur social image, plus sitemap, `llms.txt`, `llms-full.txt` aur IndexNow. India ke 12 shahron (2 offices + 10 metros) aur 5 deshon (USA, UAE, UK, Australia, Canada) ke pages bhi ban gaye hain. Lekin ranking ka bada hissa website ke **bahar** tay hota hai, aur wo kaam sirf aap kar sakte hain. Neeche priority order mein steps hain. Har step ke saamne likha hai ki usme kitna time lagta hai.

Ek zaroori niyam poori list par lagu hota hai: **business ka naam, address aur phone har jagah bilkul same likhein.**

```
Name:    Qevnaro
Phone:   +91 87965 30323
Email:   qevnaro@gmail.com
Noida:   Sector 62, Noida, Uttar Pradesh 201309
Bengaluru: HSR Layout, Bengaluru, Karnataka 560102
Website: https://www.qevnaro.in
```

Agar inme se kuch galat hai (jaise pin code ya poora street address), to pehle `frontend/src/lib/site.ts` mein sahi karwa lein, phir wahi har jagah use karein.

---

## Week 1: sabse zaroori (kul 2 se 3 ghante)

### 1. Google Search Console (20 minute)
1. https://search.google.com/search-console par jaayein, "Add property" → **Domain** → `qevnaro.in`.
2. Google ek TXT record dega. Use apne domain provider ke DNS mein add karein. (Ya "URL prefix" method chunein: wahan ek code milta hai jise `frontend/.env.local` mein `VITE_GOOGLE_SITE_VERIFICATION=` ke aage likh kar site dobara deploy karein.)
3. Verify hone ke baad: **Sitemaps** → `https://www.qevnaro.in/sitemap.xml` submit karein.
4. **URL Inspection** mein ye pages ek ek karke daal kar "Request indexing" dabayein: home, `/services`, `/work`, `/services/web-development`, `/services/seo`, `/services/geo-aeo`, `/locations/noida`, `/locations/bengaluru`.

### 2. Bing Webmaster Tools (10 minute)
ChatGPT search aur Microsoft Copilot Bing ka index use karte hain, isliye ye step AI visibility ke liye zaroori hai.
1. https://www.bing.com/webmasters → "Import from Google Search Console" (sabse aasaan).
2. Sitemap wahan bhi submit karein.
3. Har deploy ke baad terminal mein `cd frontend && npm run build && node scripts/indexnow.mjs` chalayein. Ye saare URLs Bing ko turant bata deta hai (key file `public/` mein pehle se hai).

### 3. Google Business Profile, dono offices ke liye (1 ghanta)
Local searches ("web development company in Noida") aur Maps ke liye ye sabse bada factor hai.
1. https://business.google.com par Noida aur Bengaluru ke liye **alag alag** profile banayein.
2. Primary category: **Website designer** ya **Internet marketing service**. Secondary: Software company, Marketing agency, Advertising agency.
3. Services section mein wahi naam likhein jo site par hain (Website Development, SEO, Performance Marketing, Branding, AI Automation...).
4. Website link: Noida profile par `https://www.qevnaro.in/locations/noida`, Bengaluru par `https://www.qevnaro.in/locations/bengaluru`.
5. Kam se kam 10 photos: office, team, kaam ke screenshots, logo.
6. Hours: Monday to Saturday, 9 am to 9 pm (site par yahi likha hai).
7. Google postcard ya video se verification maangega. Use poora karein.

### 4. Analytics (15 minute)
1. https://analytics.google.com par GA4 property banayein, Measurement ID (`G-XXXXXXX`) copy karein.
2. `frontend/.env.local` mein `VITE_GA_MEASUREMENT_ID=G-XXXXXXX` likhein aur deploy karein. Tag apne aap lag jayega.

---

## Week 2 se 4: trust banana

### 5. Reviews (ongoing)
AI assistants aur Google dono reviews ko bahut weight dete hain.
1. Pulse n Care aur MenusQR ke owners se Google review maangein. Unhe Google Business Profile ka "Ask for reviews" link bhejein.
2. Har naye client se project khatam hote hi review maangein. Target: pehle 3 mahine mein **10+ reviews**.
3. Har review ka jawab dein.
4. Reviews kabhi kharidein ya khud na likhein. Google aise profiles suspend kar deta hai.

### 6. Testimonials aur results site par (aapko sirf content dena hai)
Site par testimonials section abhi band hai kyunki real quotes nahi the. Mujhe ye bhejein:
- Client ka naam, designation, company, aur 2 se 3 line ka quote (unki permission ke saath).
- Agar koi real number hai (jaise "3 mahine mein 40 bookings"), to wo bhi. Sirf wahi jo client confirm kare.

Ye `frontend/src/lib/projects.ts` ke `results` field mein aur ek naye testimonials section mein jayega.

### 7. Team aur company details (aapko content dena hai)
About page par team section tab tak chhupa hai jab tak real details na ho. Bhejein:
- Founder aur core team ke naam, role, 2 line bio, photo, LinkedIn link.
- Company kab shuru hui, registered naam (agar hai).

Ye `frontend/src/data/team.ts` mein jayega. Named people hone se Google ka E-E-A-T signal aur AI assistants ka bharosa dono badhte hain.

### 8. Directory listings (2 se 3 ghante, ek baar)
Har jagah wahi naam, address, phone, description. Priority order:
1. **Clutch** (clutch.co): agencies ke liye sabse zyada cite hone wali site. Profile banayein, 2 client reviews maangein.
2. **GoodFirms**, **DesignRush**, **Sortlist**.
3. **LinkedIn company page**: poora bharein, sab services likhein.
4. **Justdial**, **Sulekha**, **IndiaMART** (local searches ke liye).
5. **Crunchbase** aur **Product Hunt**: Pulse n Care aur MenusQR ko products ke roop mein list karein, "built by Qevnaro" ke saath.
6. **Videshi markets ke liye** (sabse zaroori Clutch hai, jo in sab deshon mein cite hota hai):
   - USA: Clutch, UpCity, G2 (agar koi product hai)
   - UAE: Clutch, DesignRush, Yellow Pages UAE
   - UK: Clutch, Sortlist, The Manifest
   - Australia: Clutch, Sortlist
   - Canada: Clutch, The Manifest
   Har profile mein likhein ki aap India se remote kaam karte hain, aur currency/time-zone ki jaankari wahi rakhein jo site ke `/global/...` pages par hai.
7. **LinkedIn company page abhi exist nahi karta** (link 404 de raha tha, isliye site se hata diya). Page banayein, phir uska URL `frontend/.env.local` mein `VITE_SOCIAL_LINKEDIN=` ke aage likh kar deploy karein. X/Twitter ke liye bhi wahi (`VITE_SOCIAL_X`).

### 9. Pricing ranges (optional lekin kaam ka)
Pricing page par abhi "Quoted after a scoping call" likha hai. AI assistants "kitna kharcha" wale sawaalon par wahi sites quote karte hain jo range batati hain. Agar aap ranges dena chahein (jaise "Business website: ₹X se ₹Y"), to mujhe bata dein. Wo `frontend/src/data/pricing.ts` ke `range` field mein jayenge.

---

## Har mahine: lagataar kaam

### 10. Naye articles (mahine mein 2)
Site par ab 18 articles hain, har ek apne service page se juda hua. Agle 12 ke topics (global markets ko bhi cover karte hue):

| # | Topic | Kis page se link hoga |
|---|---|---|
| 1 | Hiring an offshore web development team: a checklist for US businesses | Web development (USA) |
| 2 | Arabic and English websites: what bilingual really involves | Web development (UAE) |
| 3 | UK GDPR for small business websites: cookies, forms and analytics | Web development (UK) |
| 4 | Local SEO for Australian trades and service businesses | SEO (Australia) |
| 5 | Building a bilingual English–French site for Quebec | Web development (Canada) |
| 6 | How much does a mobile app cost in India? | Mobile apps, Pricing |
| 7 | Real-estate lead generation: what actually lowers cost per site visit | Performance marketing for real estate |
| 8 | SEO for coaching institutes in Delhi and Kota | SEO for education |
| 9 | Shopify SEO: the settings most stores get wrong | E-commerce, SEO |
| 10 | GEO in 2027: tracking whether AI assistants mention your brand | GEO & AEO |
| 11 | What a design system is and when you need one | UI/UX design |
| 12 | Choosing a CRM for a 10-person sales team | Marketing automation |

Article likhne ke liye mujhe topic bata dein, main site ke format mein likh dunga.

### 11. Mentions aur backlinks
- Founder LinkedIn par hafte mein 1 post: kaam ke behind-the-scenes, seekh, case study.
- Reddit (r/india, r/startups, r/SEO) aur Quora par apne field ke sawaalon ke kaam ke jawab dein. Link tabhi dein jab sach mein relevant ho.
- Pulse n Care aur MenusQR ki site ke footer mein "Built by Qevnaro" link lagwayein.
- Local business groups, startup communities aur trade publications mein guest article.

### 12. Mahine ka check (30 minute)
1. Search Console → Performance: kaunse queries par impressions aa rahe hain, kaunse pages par.
2. In 20 sawaalon ko ChatGPT, Gemini aur Perplexity mein poochein aur ek sheet mein note karein ki Qevnaro aata hai ya nahi, aur kaunse sources cite hote hain:
   - **India:** best web development company in Noida · SEO agency in Noida Sector 62 · GEO AEO agency India · digital marketing agency in HSR Layout Bengaluru · who built Pulse n Care website · QR menu platform developer India · AI automation agency for small business India · branding agency in Bengaluru for startups · e-commerce development company in Pune · SEO company in Mumbai · performance marketing agency Hyderabad · web development company Jaipur
   - **Videsh:** offshore web development agency India for US startups · Arabic English website developer Dubai · UK GDPR compliant website agency India · Shopify developer India for Australian store · bilingual website agency for Quebec · AI automation agency India for US companies · India-based SEO agency for UK businesses · mobile app developer India for UAE
3. Jo sources baar baar cite hote hain (jaise Clutch ya koi blog), wahan apni presence banayein.

---

## Kya expect karein

| Kab | Kya hona chahiye |
|---|---|
| 1 se 2 hafte | "Qevnaro" naam search par site #1; pages Google mein index |
| 1 se 3 mahine | Google Business Profile Maps mein dikhne lage; long-tail searches par impressions |
| 3 se 6 mahine | Local aur specific searches ("GEO agency Noida") par top 3, agar reviews aur listings ho gaye hain |
| 12+ mahine | Broad keywords ("digital marketing agency India") par movement, lagataar content aur backlinks ke saath |
| 6 se 18 mahine | Videshi searches ("offshore web development India for US") par movement, sirf tab jab Clutch reviews aur us desh ke clients ho |

Koi bhi agency #1 ranking ya AI mention guarantee nahi kar sakti. Ye checklist wo sab karti hai jo aapke control mein hai.
