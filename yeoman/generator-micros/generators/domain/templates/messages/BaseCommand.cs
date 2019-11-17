using System;
using MicroS_Common.Messages;

namespace <%=namespace%>.domain.<%=changeCase.pascalCase(name) %>s.Messages.Commands
{
    [MessageNamespace("<%=changeCase.lowerCase(name) %>s")]
    public abstract class <%=changeCase.pascalCase(name) %>BaseCommand : BaseCommand
    {

        public <%=changeCase.pascalCase(name) %>BaseCommand() : base()
        {
        }
    }
}
