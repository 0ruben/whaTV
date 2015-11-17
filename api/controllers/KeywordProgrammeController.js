/**
 * KeywordprogrammeController
 *
 * @description :: Server-side logic for managing keywordprogrammes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    addKeyword: function(req, res) {
        var kw = ToolsService.clean(req.param("kw"));
        Keyword.findOne({
            cleanname: kw
        }).exec(function(err, keyword) {
            if (err) {
                console.log(err);
                return res.status(400).end();
            } else if (!keyword) {
                Keyword.create({
                    user: req.param('user'),
                    str: req.param('kw')
                }).exec(function(err, keyword) {
                    console.log(err);
                    Programme.query("select id from programme where titre like '%" + kw + "%' or soustitre like '%" + kw + "%' or description like '%" + kw + "%' or casting like '%" + kw + "%'", function(err, programmes) {
                        console.log(err);
                        _.each(programmes, function(programme, index) {
                            KeywordProgramme.create({
                                keyword: keyword.id,
                                programme: programme.id
                            });
                            if (index == programmes.length - 1) res.status(200).end();
                        });
                    });
                });
            }
        })

    },

    getKeywordProgrammes: function(req, res) {
        var keywords = req.param('keywords');
        var programmes = [];
        async.each(keywords, function(word, cb) {
            KeywordProgramme.find({
                keyword: word
            }, function(err, res2) {
                if (err) {
                    console.log(err);
                    return res.status(400).end();
                } else {
                    var tab = _.pluck(res2, 'programme')
                    Programme.find({
                        id: tab
                    }, function(req, result) {
                        programmes.push(result);
                        cb();
                    });
                }
            });
        }, function() {
            console.log('début', programmes, 'fin');
            res.status(200).json(programmes);
        });
    }
};
