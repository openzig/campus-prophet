import emailjs from 'emailjs-com';

export default class Utils {
    static sendReplyNotification(replyer_name: string, poster_name: string, to_addr: string, post_id: string) {
        emailjs.send('service_upu99ll', 'template_6ulbrsl', {
            to_name: poster_name,
            from_name: replyer_name,
            view_link: `${process.env.REACT_APP_WEBSITE_URL}/post/${post_id}`,
            reply_to: to_addr,
        }, 'user_60cakxpkDeHLoB26feNAu')
            .then((result) => {

            }, (error) => {

            });
    }
}