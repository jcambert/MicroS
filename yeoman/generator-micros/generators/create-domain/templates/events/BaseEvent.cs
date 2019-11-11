using MicroS_Common.Messages;

namespace <%=namespace%>.domain.<%=changeCase.titleCase(name) %>s.Messages.Events
{
    [MessageNamespace("<%=changeCase.lowerCase(name) %>s")]
    public abstract class <%=changeCase.titleCase(name) %>BaseEvent:BaseEvent
    {
    }
}
