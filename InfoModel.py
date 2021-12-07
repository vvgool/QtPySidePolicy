# This Python file uses the following encoding: utf-8

# {
#   'name':[
#               {
#                   'action':[
#                                {
#                                     'name':'','time':'','action':'','msg':'','stacks':''
#                                }
#                               ]
#               }
#           ]
# }


class InfoModel:
    def __init__(self, name, time, action, msg, stacks):
        self.name = name
        self.time = time
        self.action = action
        self.msg = msg
        self.stacks = stacks

    def parse(data):
        return InfoModel(data['name'],
                         data['time'],
                         data['action'],
                         data['msg'],
                         data['stacks'])
