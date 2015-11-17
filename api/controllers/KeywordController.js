/**
 * KeywordController
 *
 * @description :: Server-side logic for managing keywords
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getKeywords: function(req, res) {
        Keyword.query("select str, count(*) as compteur from keyword where str like '%" + ToolsService.clean(req.param('keyword')) + "%' and user<>" + req.param('user') + " group by str order by compteur desc limit " + req.param('limit')).exec(function(err, keywords) {
            if (err) {
                console.log(err);
                return res.status(400).end();
            } else
                return res.status(200).json(keywords);
        });

    },





};
