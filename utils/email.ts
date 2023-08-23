const { SendEmailCommand, SESClient } = require("@aws-sdk/client-ses");
// require("dotenv").config()

export const sendEmail = async (email:string, subject:string, SES_CONFIG:any) => {
    // console.log('sending email start')
    // console.log(SES_CONFIG)

  // const SES_CONFIG = {
  //   credentials: {
  //     accessKeyId: process.env.SES_ACCESS_KEY,
  //     secretAccessKey: process.env.SES_SECRET,
  //   },
  //   region: process.env.SES_REGION,
  // };

  const sesClient = new SESClient(SES_CONFIG);


  let params = {
    // source: email,
    Destination: {
      /* required */
      CcAddresses: [
        email,
        /* more items */
      ],
      ToAddresses: [
        email,
        /* more items */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: "<div>here is html body</div>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "here is text body",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: email /* required */,
    ReplyToAddresses: [
      email,
      /* more items */
    ],
  };




  try {
    // console.log('trying .... ')
    const sendEmailCommand = new SendEmailCommand(params);
    const res = await sesClient.send(sendEmailCommand);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
