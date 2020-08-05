const sgMail=require('@sendgrid/mail')
const sendGridApi='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'

sgMail.setApiKey(sendGridApi)

sgMail.send({
    to:'kattapratheek97@gmail.com',
    from:'rbei.node.js.forum@gmail.com',
    subject:'first mail',
    text:'hello all'
})