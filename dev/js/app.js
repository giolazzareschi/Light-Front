'use strict';

var KClass, Appcore, Modal, BaseTpl, LzButton, Super, Memo, Workspace, BaseMessage, Message;
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
		dom : null,
		create : function( params ){			
			this.tpl = MDL.templates[ this.tplname ]( params );
			this.dom = document.createElement('div');
			this.dom.innerHTML = this.tpl;
		},
		show : function(){
			var ch = this.dom.children;
			while( ch.length )
				Appcore.stage().appendChild( ch[ 0 ] );
		}
	};
	Memo = {
		created_at : null,
		create : function(){
			this.created_at = +(new Date);
		}
	};
	Modal = {
		extends : [BaseTpl],
		tplname : 'modal',
		create : function(){
			Super({
				fn : 'create',
				context : this,
				arguments : {
					'title' : 'teste'
				}
			});
			var btnsave = KClass.create( LzButton );
			btnsave.create({
				cssClass : 'btn-modal-save',
				onClick : function(){
					console.log( this );
				}
			});
			this.dom.querySelector('.footer').appendChild( btnsave.dom );
		}
	};
	LzButton = {
		tplname : 'button',
		extends : [BaseTpl, Memo],
		create : function( params ){
			Super({
				fn : 'create',
				context : this,
				arguments : [{
					'css-class' : params.cssClass,
					'label' : 'Save'
				},{}]
			});
			this.dom.addEventListener('click',params.onClick,false);
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

			this.show(this);
		},
		appendNewMessage : function( new_message ){			
			var ch = new_message.dom.children;
			var last = Appcore.chatStage().children[ 0 ];
			while( ch.length )
				Appcore.chatStage().insertBefore( ch[ 0 ], last );
		}
	};
	BaseMessage = {
		datetime : null,
		device : null,
		user : null,
		create : function(){			
			this.datetime = +(new Date);
		}
	};
	Message = {
		tplname : 'message',
		extends : [BaseMessage,BaseTpl],
		create : function(){
			var me = this;		
			Super({
				fn : 'create',
				context : this,
				arguments : [{},{
					'datetime' : +(new Date)
				}]
			});
			Workspace.appendNewMessage( this );
		}
	}
})(window);

document.onreadystatechange = function(){
	if(this.readyState == 'complete'){
		Appcore.init();
	}
};