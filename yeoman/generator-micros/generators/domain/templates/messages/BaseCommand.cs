using System;
using MicroS_Common.Messages;

namespace <%=namespace%>.domain.<%=changeCase.titleCase(name) %>s.Messages.Commands
{
    [MessageNamespace("<%=changeCase.lowerCase(name) %>s")]
    public abstract class <%=changeCase.titleCase(name) %>BaseCommand : BaseCommand
    {

        public <%=changeCase.titleCase(name) %>BaseCommand() : base()
        {
        }
    }
}
