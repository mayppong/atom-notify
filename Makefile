UUID=nos-notify\@numixproject.org
INSTALLDIR=~/.local/share/gnome-shell/extensions/$(UUID)

all:

install: local

local:
	# Create directory
	mkdir -p $(INSTALLDIR) 

	# Clear directory
	rm -rf $(INSTALLDIR)/*

	# Copy new contents in
	cp -rf ./src/* $(INSTALLDIR)
