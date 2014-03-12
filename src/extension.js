
const Lang = imports.lang;
const Clutter = imports.gi.Clutter;

const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;
const PanelMenu = imports.ui.panelMenu;
const Panel = imports.ui.panel;

const NotificationCenter = new Lang.Class({
    Name:    'nos-notify/NotificationCenter',
    Extends:  PanelMenu.Button,
    
    _init: function() {
        this.parent( 0.0, 'Notification Center' );
        
        let icon = new St.Icon({ 
            icon_name:   'system-run-symbolic',
            style_class: 'system-status-icon'
        });
        this.actor.add_actor( icon );
         
        this._createMenu();
    },
    _createMenu: function() {
        
        let hbox = new St.BoxLayout({ style_class: '' });
        let label = new St.Label({
            text:     'Notification Center',
            y_expand:  true,
            y_align:   Clutter.ActorAlign.CENTER
        });

        hbox.add_child( label );
        this.menu.box.add_child(hbox);
    }

});


let button;

function init() {

}

function enable() {
    button = new NotificationCenter();

    Main.panel.addToStatusArea('notifycenter', button);
}

function disable() {
    Main.panel._rightBox.remove_child(button);
}
