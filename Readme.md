# You can create private network using following command:
  * goal network create -r [Root_dir] -d [Root_dir/data] -t networktemplate.json
  * goal network start -r [Root_dir] -d [Root_dir/data]
# The you'll need to start node:
  * cargo node start -d [Root_dir/data]
# After that you'll have private network with funded account. You can get account address with command:
  * goal account -d [Root_dir/data]
