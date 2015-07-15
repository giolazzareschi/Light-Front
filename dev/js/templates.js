this["MDL"] = this["MDL"] || {};
this["MDL"]["templates"] = this["MDL"]["templates"] || {};
this["MDL"]["templates"]["button"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"mdls-button "
    + alias3(((helper = (helper = helpers['css-class'] || (depth0 != null ? depth0['css-class'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"css-class","hash":{},"data":data}) : helper)))
    + "\">"
    + alias3(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"label","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});
this["MDL"]["templates"]["home"] = this["MDL"]["templates"]["home"] || {};
this["MDL"]["templates"]["home"]["header"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div appheader>"
    + this.escapeExpression(((helper = (helper = helpers.header || (depth0 != null ? depth0.header : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"header","hash":{},"data":data}) : helper)))
    + "</div>";
},"useData":true});
this["MDL"]["templates"]["message"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"message-wrp\">\r\n	"
    + this.escapeExpression(((helper = (helper = helpers.datetime || (depth0 != null ? depth0.datetime : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"datetime","hash":{},"data":data}) : helper)))
    + "\r\n</div>";
},"useData":true});
this["MDL"]["templates"]["modal"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"mdls-modal\">\r\n	<div class=\"header\">\r\n		<div class=\"displaytable\">\r\n			<div class=\"displaytablecell title\">"
    + this.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\r\n			<div class=\"displaytablecell btnclose\">X</div>\r\n		</div>\r\n	</div>\r\n	<div class=\"content\">\r\n		teste\r\n	</div>\r\n	<div class=\"footer\"></div>\r\n</div>";
},"useData":true});
this["MDL"]["templates"]["workspace"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    return "<div appview id=\"chatview\"></div>\r\n<div appchat>\r\n	<input id=\"chatmaininput\" />\r\n</div>";
},"useData":true});