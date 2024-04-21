const Post = require('../models/post');
const Hashtag = require('../models/hashtag');

exports.afterUploadImage = (req, res) => {
    console.log(req.file + "============afterUploadImage");
    res.json({ url: `/img/${req.file.filename}` }); //req.file을 콘솔로 찍어보고 거기에 맞게 filename을 불러오면 됨.
}
exports.uploadPost = async (req, res, next) => {
    // req.body.content, req.body.url  ==> html 파일에서 form 을 넘겨줄때 이름을 확인해야함
    try {
        // /#[^\s#]*/g  <= 해쉬태그 정규표현식
        const post = await Post.create({
            content: req.body.content,
            img: req.body.url,
            UserId: req.user.id,
        });
        // await post.addUser(req.user.id)이렇게도 가능하나 쿼리를 두번쓰는것보다 한번쓰는게 좋음.

        const hashtags = req.body.content.match(/#[^\s#]*/g);
        if (hashtags) {
            const result = await Promise.all(hashtags.map((tag) => {
                return Hashtag.findOrCreate({
                    where: { title: tag.slice(1).toLowerCase() }
                });
            }));
            console.log(result,"=================result");
            await post.addHashtags(result.map(r => r[0]));
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
}