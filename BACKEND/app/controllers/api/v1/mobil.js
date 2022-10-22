const postService = require('../../../services/postService') 
module.exports = { 
    async list(req, res) { 
        try { 
            const posts = await postService.list(); 
            res.status(200).json({ 
                status: "OK", 
                data: { 
                    post: posts.data, 
                    count: posts.count 
                }, 
            }); 
        } catch (err) { 
            res.status(400).json({ 
                status: "FAIL", 
                message: err.message, 
            }); 
        } 
    }, 
 
    async create(req, res) { 
        try { 
            const post = await postService.create({ 
                nama: req.body.nama, 
                harga: req.body.harga, 
                ukuran: req.body.ukuran, 
                gambar: req.body.gambar, 
                createdby: req.user.name
                 
            }); 
            res.status(201).json({ 
                status: "OK", 
                data: post, 
            }); 
        } catch (err) { 
            res.status(201).json({ 
                status: "FAIL", 
                message: err.message, 
            }); 
        } 
    }, 
 
    async update(req, res) { 
        try { 
            const post = await postService.update( 
                req.params.id, req.body, req.body.updatedby = req.user.name
            ); 
            res.status(200).json({ 
                status: "OK", 
                data: post, 
            }); 
        } catch (err) { 
            res.status(422).json({ 
                status: "FAIL", 
                message: err.message, 
            }); 
        } 
    }, 
 
    async destroy(req, res) { 
        try { 
            const post = await postService.delete(req.params.id); 
            res.status(204).end(); 
        } catch (err) { 
            res.status(422).json({ 
                status: "FAIL", 
                message: err.message, 
            }); 
        } 
    }, 
 
    async show(req, res) { 
        try{ 
            const post = await postService.getDetail(req.params.id); 
            res.status(200).json({ 
                    status: "OK", 
                    data: post, 
                }); 
        }catch(err){ 
            res.status(422).json({ 
                    status: "FAIL", 
                    message: err.message, 
                }); 
        } 
    }, 
 
    async showSize(req, res){ 
        try{ 
            const post = await postService.getSize(req.query); 
            console.log(post) 
            res.status(200).json({ 
                status: "OK", 
                data: post, 
            }); 
        }catch(err){ 
            res.status(422).json({ 
                    status: "FAIL", 
                    message: err.message, 
                }); 
        } 
    },
    async deletedBy(req, res, next){ 
        try { 
            const user = req.user.name 
            const post = await postService.update( 
                req.params.id, 
                req.body, 
                req.body.deletedby = user 
            ); 
            res.status(200).json({ 
                status: "OK", 
                data: post, 
            }); 
            next(); 
        } catch (err) { 
            res.status(422).json({ 
                status: "FAIL", 
                message: err.message, 
            }); 
        } 
    },
 
};