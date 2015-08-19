'use strict';

var KClass, BaseTpl, Super;
;(function(w){
	Super = function( params ){
		if( params.context.super !== undefined ){
			var sper = params.context.super[ params.fn ];
			if( sper.length === 1 ){
				sper.call( params.context, params.arguments );		
			}else{
				for( var i=0, qt=sper.length; i < qt; i++ ){
					var s = sper[ i ];
					s.call( params.context, params.arguments[ i ] );
				}
			}
		}  
	};
	KClass = {
		create : function( PROTO, EXTENDS_PARAMS ){
			var p = Object.create( PROTO );				
			if( EXTENDS_PARAMS || p.extends ){
				p['super'] = {};
				var ext = EXTENDS_PARAMS || p.extends;
				for(var i=0, qt = ext.length; i < qt; i++){
					var pp = ext[ i ];
					var np = KClass.create( pp );
					for (var prop in np) {
						if (pp.hasOwnProperty(prop)) {							
							if( p[prop] !== undefined ){								
								if( p.super !== undefined ){
									if( p.super.length === undefined ){
										if( p.super[prop] !== undefined ){
											var tmp = p.super[prop];
											p.super[ prop ] = [];
											p.super[ prop ][ 0 ] = tmp;
											p.super[ prop ][ 1 ] = pp[ prop ];
										}else{
											p["super"][prop] = pp[prop];
										}
									}else{
										p.super[ prop ][ p.super.length ] = pp[ prop ];
									}
								}
							}else{
								p[prop] = pp[prop];   
							}
						}
					}
				}
			}

			return p;
		}
	};
	BaseTpl = {
		tpl : null,
		_dom : null,
		create : function( params ){			
			this.tpl = HandlebarsTemplates[ this.tplname ]( params );
			this._dom = document.createElement('div');
			this._dom.innerHTML = this.tpl;
		},
		dom : function(){
			var clone = this._dom.children[0].cloneNode(true);
			return clone;
		},
		listener : function(type, fn, bubbles){			
			this._dom.addEventListener(type, fn.bind(this), bubbles);
			return this;
		}
	};
})(window);