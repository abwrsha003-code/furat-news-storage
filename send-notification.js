const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FCM_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const title = process.env.NEWS_TITLE || 'خبر جديد';
const region = process.env.NEWS_REGION || '';

const message = {
  notification: {
    title: `خبر جديد: ${title}`,
    body: region ? `المنطقة: ${region}` : 'انقر لعرض التفاصيل'
  },
  data: {
    newsId: process.env.NEWS_ID || ''
  },
  topic: 'furat_news'
};

admin.messaging().send(message)
  .then((response) => {
    console.log('✅ تم إرسال الإشعار بنجاح:', response);
  })
  .catch((error) => {
    console.error('❌ فشل الإرسال:', error);
    process.exit(1);
  });
