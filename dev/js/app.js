'use strict';

var KClass, Appcore, Modal, BaseTpl, LzButton, Super, Workspace, LzHeader;
;(function(w){
	function Super( params ){		
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
	Appcore = {
		stage : function(){
			return document.querySelector('div[appstage]');
		},
		init : function(){			
			var ws = KClass.create( Workspace );
			ws.create();
		},
		chatStage : function(){
			return document.querySelector('#chatview');
		}
	};
	BaseTpl = {
		tpl : null,
		_dom : null,
		create : function( params ){			
			this.tpl = MDL.templates[ this.tplname ]( params );
			this._dom = document.createElement('div');
			this._dom.innerHTML = this.tpl;
		},
		dom : function(){
			return this._dom.children[ 0 ];
		}
	};
	Modal = {
		extends : [BaseTpl],
		tplname : 'modal',
		create : function( params ){
			Super({
				fn : 'create',
				context : this,
				arguments : {
					'title' : params.title,
					'content' : params.content
				}
			});
			var btnsave = KClass.create( LzButton );
			btnsave.create({
				'label' : 'Aceitar',
				'cssClass' : 'btn-modal-save',
				onClick : function(){
					var modal = document.querySelector('.mdls-modal');
					modal.parentNode.removeChild( modal );
				}
			});
			this.dom().querySelector('.footer').appendChild( btnsave.dom() );
		}
	};
	LzButton = {
		tplname : 'button',
		extends : [BaseTpl],
		create : function( params ){
			Super({
				fn : 'create',
				context : this,
				arguments : {
					'css-class' : params.cssClass,
					'label' : params.label
				}
			});
			this.dom().addEventListener('click',params.onClick,false);
		}
	};
	LzHeader = {
		tplname : 'header',
		extends : [BaseTpl],
		create : function( params ){
			Super({
				fn : 'create',
				context : this,
				arguments : params.tplParams
			});
		}
	};
	Workspace = {
		tplname : 'workspace',
		extends : [BaseTpl],
		create : function(){
			Super({
				fn : 'create',
				context : this,
				arguments : {
					'welcome' : 'Bem-vindo'
				}
			});

			var header = KClass.create( LzHeader );
			header.create({
				tplParams : {
					'cssClass' : 'app-main-header',
					'title' : 'iGo Pizzas',
					'firstButtonClass' : 'app-btn-menu icon-menu',
					'lastButtonClass' : 'app-btn-search icon-doc-text'
				}
			});

			var modal = KClass.create( Modal );
			modal.create({
				title : 'Novo pedido',
				content : '<div>TESTE</div>'
			});

			this.dom().querySelector('div[appview] .appheader').appendChild( header.dom() );

			this.append( modal.dom() );

			var ch = this.dom().children;
			while( ch.length )
				Appcore.stage().appendChild( ch[0] );
		},
		append : function( dom ){
			this.dom().querySelector('div[appview] .applist').appendChild( dom );
		}
	};
})(window);

document.onreadystatechange = function(){
	if(this.readyState == 'complete'){
		Appcore.init();
	}
};