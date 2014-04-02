/**
 * This is the main file used to load the extension, it must have
 * init(), enable() and disable() methods provided below.
 *
 * TO-DO: break classes off to its own files
 */

const Lang      = imports.lang;
const Clutter   = imports.gi.Clutter;
const St        = imports.gi.St;

const Main      = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Panel     = imports.ui.panel;

const Gio       = imports.gi.Gio;
/**
 * This class provides the icon in the system status area 
 * and the menu.
 */
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
        this._setSignalHandler();
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
    },
    _setSignalHandler: function() {
        let volumeMonitor = Gio.VolumeMonitor.get();
        volumeMonitor.connect('volume-added', volumeAdded);
        //volumeMonitor.connect('drive-connected', driveConnected);
    }

});


function volumeAdded() {
    Main.notify('Volume Monitor', 'Volume added.');
}


let button;

/**
 * init() is called at most once in a GNOME Shell session, 
 * during the first-run before enable(). 
 * A good place for global initialization. 
 * Don't do any thing major like UI modification.
 */
function init() {
  
}

/**
 * enable() is called when the user enables the extension.
 */
function enable() {
    button = new NotificationCenter();
    Main.panel.addToStatusArea('notifycenter', button);
}

/**
 * disable() is called when the user disables the extension.
 */
function disable() {
    Main.panel._rightBox.remove_child(button);
}
