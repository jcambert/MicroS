using MicroS_Common.Messages;

namespace <%=namespace%>.domain.<%=changeCase.pascalCase(name) %>s.Messages.Events
{
    [MessageNamespace("<%=changeCase.lowerCase(name) %>s")]
    public abstract class <%=changeCase.pascalCase(name) %>BaseEvent:BaseEvent
    {
    }
}
