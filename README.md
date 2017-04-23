Windows Undefender
==================

A utility script to quickly add paths to the Windows Defender exclude list.

Adding node_modules to exclusions can massively improve performance!

Installation
------------

    npm install -g undefender

Usage
-----

    cd my_folder
    undefender node_modules

Removing exclusions
-------------------

Undefender cannot remove exclusions, you'll have to open the windows defender preferences to do that!
