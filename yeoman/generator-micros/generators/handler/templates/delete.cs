using AutoMapper;
using MicroS_Common.Handlers;
using MicroS_Common.RabbitMq;
using MicroS_Common.Repository;
using MicroS_Common.Types;
using System.Threading.Tasks;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Domain;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Messages.Commands;
using <%=namespace%>.domain.<%= changeCase.titleCase(name) %>s.Messages.Events;
using <%=namespace%>.Services.<%= changeCase.titleCase(name) %>s.Repositories;

/// <summary>
/// @author: <%=author.name%>
/// @email: <%=author.email%>
/// @created_on: <%= new Date()%>
/// </summary>
namespace <%=namespace%>.Services.<%= changeCase.titleCase(name) %>s.Handlers
{


    /// <summary>
    /// Delete <%= changeCase.titleCase(name) %> Handler
    /// </summary>
    public partial class Delete<%= changeCase.titleCase(name) %>Handler : DomainCommandHandler<Delete<%= changeCase.titleCase(name) %>, <%= changeCase.titleCase(name) %>>
    {
        #region Constructors
        public Delete<%= changeCase.titleCase(name) %>Handler(IBusPublisher busPublisher, IMapper mapper, IRepository<<%= changeCase.titleCase(name) %>> repo) : base(busPublisher, mapper, repo)
        {
        }
        #endregion
        #region Protected Overrides functions
        /// <summary>
        /// Check if the model exist by Command
        /// </summary>
        /// <param name="command">The command in wich information can be use do check if the model exist in database</param>
        /// <returns>Nothing</returns>
        protected override async Task CheckExist(Delete<%= changeCase.titleCase(name) %> command)
        {
            if (!await (Repository as I<%= changeCase.titleCase(name) %>sRepository).ExistsAsync(command.Id))
            {
                throw new MicroSException("<%= changeCase.lowerCase(name) %>_not_found",$"<%= changeCase.titleCase(name) %>: '{command.Id}'  was not found.");
            }

        }
        #endregion

        #region Public Overrides functions
        /// <summary>
        ///  Handle the command with context
        /// </summary>
        /// <param name="command">The command to handle</param>
        /// <param name="context">The correlation context</param>
        /// <returns></returns>
        public override async Task HandleAsync(Delete<%= changeCase.titleCase(name) %> command, ICorrelationContext context)
        {
            await base.HandleAsync(command, context);
            await Repository.DeleteAsync(command.Id);
            await BusPublisher.PublishAsync(CreateEvent<<%= changeCase.titleCase(name) %>Deleted>(command) , context);

        }
        #endregion
    }
}
