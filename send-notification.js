const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FCM_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const notificationTitle = process.env.NOTIF_TITLE || 'خبر جديد';
const newsTitle = process.env.NEWS_TITLE || 'بدون عنوان';
const region = process.env.NEWS_REGION || '';
const action = process.env.NEWS_ACTION || 'جديد';
const newsBody = process.env.NEWS_BODY || '';

const message = {
  data: {
    title: `${notificationTitle}: ${newsTitle}`,
    body: newsBody || (region ? `المنطقة: ${region}` : `تم ${action} الخبر`),
    newsId: process.env.NEWS_ID || '',
    action: action,
    region: region
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
